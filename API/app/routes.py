import warnings
import glob
import lightkurve as lk
import os
from MethodBLS import method_bls
from GeneralFunctions import general

import pandas as pd

from io import StringIO

from flask import request, Blueprint, jsonify, Response

import matplotlib
matplotlib.use('Agg')

import lightkurve as lk

import glob
from werkzeug.utils import secure_filename 

import warnings


warnings.filterwarnings("ignore", category=UserWarning, module="astropy")
warnings.filterwarnings("ignore", category=UserWarning, module="lightkurve")

bp = Blueprint('routes', __name__)

# Initialize a variable to store the received JSON data
received_json = ""


@bp.route('/')
def index():
    return jsonify({'message': 'Bem-vindo ao meu projeto Flask!'})

@bp.route('/getDataTelescope', methods=['POST'])
def get_data_telescope():
    try:
        data = request.json
        received_id = data["id"].upper()

        df = general.read_dataset(received_id)

        # Convert the DataFrame to CSV format
        csv_data = df.to_csv(index=False)

        # Return CSV data as a response
        return Response(csv_data, mimetype='text/csv')

    except Exception as e:
        return jsonify({"Error": str(e)}), 400


@bp.route('/getTargets', methods=['POST'])
def get_targets():
    try:
        data = request.json
        received_id = data["id"].upper()
        
        # Check if the ID is empty or equal to TESS or Kepler
        if not received_id or received_id not in ["TESS", "KEPLER"]:
            return jsonify({"Error": "Invalid ID value"}), 500

        # Define the CSV file path
        csv_file_path = f'Datasets/{received_id}/*.csv'

        telescope_csv_paths = glob.glob(csv_file_path)

        # Check if the file exists
        if not telescope_csv_paths:
            return jsonify({"Error": "CSV file not found for the given ID"}), 404

        csv_data = ''
        with open(telescope_csv_paths[0], 'r') as f:
            csv_data = '\n'.join(
                list(filter(lambda a: not a.startswith('#'), f.readlines())))[1:]

        # Read the CSV file
        df = pd.read_csv(StringIO(csv_data), on_bad_lines='skip')

        # Defines the information dictionary for each telescope
        telescope_info = {
            "KEPLER": {
                "drop_method": None,
                "rename_columns": {
                    "kepid": "id_target",
                    "koi_disposition": "disposition",
                    "koi_period": "period",
                    "koi_duration": "duration"
                },
                "select_columns": ['id_target', 'disposition', 'period', 'duration', 'koi_time0bk']
            },
            "TESS": {
                "drop_method": None,
                "rename_columns": {
                    "tid": "id_target",
                    "tfopwg_disp": "disposition",
                    "pl_orbper": "period",
                    "pl_trandurh": "duration"
                },
                "select_columns": ['id_target', 'disposition', 'period', 'duration']
            }
        }

        # Process the dataset based on the telescope information
        if received_id in telescope_info:
            info = telescope_info[received_id]

            if info['drop_method'] is not None:
                df = df[df['discoverymethod'] != info['drop_method']]

            df.rename(columns=info['rename_columns'], inplace=True)
            df = df[info['select_columns']]

        if received_id == "TESS":
            names_disp = {"FP": 'FALSE POSITIVE', "PC": 'CANDIDATE',
                          "CP": 'CONFIRMED', "FA": 'FALSE POSITIVE', "KP": 'CONFIRMED'}
            df.replace({'disposition': names_disp}, inplace=True)

        df = df[df['disposition'] != 'CANDIDATE']
        list_targets = df["id_target"].unique().tolist()
        list_targets = list(map(str, list_targets))

        response_data = {"list_targets": list_targets}
        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({"Error": str(e)}), 400


@bp.route('/getCandidatesValid', methods=['POST'])
def get_candidates_valid():
    try:
        data = request.json
        telescope = data["telescope"].upper()
        vision = data["vision"].lower()
        
        # Check if the ID is empty or equal to TESS or Kepler
        if not telescope or telescope not in ["TESS", "KEPLER"]:
            return jsonify({"Error": "Invalid ID value"}), 500

        # Define the CSV file path
        csv_file_path = f'PreprocessedCandidate{telescope}/preprocessed_{vision}_view_candidate.csv'

        telescope_csv_paths = glob.glob(csv_file_path)

        # Check if the file exists
        if not telescope_csv_paths[0]:
            return jsonify({"Error": "CSV file not found for the given ID"}), 404

        # Read the CSV file
        df = pd.read_csv(telescope_csv_paths[0])

        list_targets = df['target'].unique().tolist()
        list_targets = [str(int(item.split()[1])) for item in list_targets]

        response_data = {"list_targets_candidates": list_targets}
        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({"Error": str(e)}), 400


@bp.route('/getSectorTargets', methods=['POST'])
def get_sector_targets():
    try:
        data = request.json
        id_target = data["id_target"]
        telescope = data["telescope"].upper()

        dict_sectorAuthors = general.getSectorsAuthors(id_target, telescope)

        return jsonify(dict_sectorAuthors), 200

    except Exception as e:
        return jsonify({"Error": str(e)}), 400


@bp.route('/getModels', methods=['GET'])
def get_models():
    try:
        base_directory = 'Models/*'

        list_models = [directory.replace('Models\\', '') for directory in glob.glob(
            base_directory) if os.path.isdir(directory)]

        # Return JSON
        response_data = {"list_models": list_models}
        return jsonify(response_data)

    except Exception as e:
        return jsonify({"Error": str(e)}), 400


@bp.route('/insertModel', methods=['POST'])
def insert_model():
    try:
        model_file = request.files['model']
        vision = request.form.get('vision').lower()

        if not vision:
            return jsonify({"Error": "A vision is needed"}), 400

        # Check if a file is included in the POST request
        if 'model' not in request.files:
            return jsonify({"Error": "No file part"}), 400

        # Check if the file has a .pkl extension
        if not model_file.filename.endswith('.pkl'):
            return jsonify({"Error": "Invalid file format. Please provide a .pkl file"}), 400

        # Get the filename without the extension
        filename_without_extension = os.path.splitext(secure_filename(model_file.filename))[0]

        # Add the vision to the filename
        filename_with_vision = f"{filename_without_extension}_{vision}.pkl"

        # Create the folder with the base filename of the file
        os.makedirs(f"Models/{filename_without_extension}", exist_ok=True)

        # Save the file with the modified name in the folder
        model_file.save(os.path.join(f"Models/{filename_without_extension}", filename_with_vision))

        return jsonify({"message": "Model uploaded successfully"}), 200

    except Exception as e:
        return jsonify({"Error": str(e)}), 500


@bp.route('/generateGraph', methods=['POST'])
def generate_graph():
    try:
        data = request.json
        id_target = data["id"]
        sector = data["sector"]
        sector = data["sector"]
        author_observation = data['author']
        telescope = data['telescope']
        
        try: 

            if telescope == 'KEPLER':
                id_target = 'KIC ' + str(id_target)
                
            elif telescope == 'TESS':
                id_target = 'TIC ' + str(id_target)
            
            lc = lk.search_lightcurve(id_target, author=author_observation, sector= sector).download_all()
            
            if lc is not None:

                df, plot1_image_base64, plot2_image_base64 = method_bls.data_bls(
                    lc)

                # Convert the DataFrame to CSV format
                csv_data = df.to_csv(index=False)

                # Response
                return jsonify({"data": csv_data, "image1_base64": plot1_image_base64, "image2_base64": plot2_image_base64})

            else:
                return jsonify({"Error": "No light curve data found"}), 404

        except Exception as e:
            return jsonify({"Error": str(e)}), 500

    except Exception as e:
        return jsonify({"Error": str(e)}), 400


@bp.route('/predictTargetCandidate', methods=['POST'])
def predict_target_candidate():
    try:
        data = request.json
        name_telescope = data['name_telescope']
        id_target_candidate = data["id_candidate"]
        model = data["model"]
        vision = data["vision"]  # global, local or all
        is_multiview = data["multiview"] == True
        mode_multiview = data["mode"]

        df, img_base64_dict = general.get_data_candidates(
            id_target_candidate, name_telescope, vision)

        loaded_model = general.load_model(model, vision)

        if loaded_model is not None:
            predictions = general.predict_candidate(df, loaded_model)

            # Combine the keys from both dictionaries
            all_keys = set(predictions.keys()) | set(img_base64_dict.keys())

            # Initialize a new dictionary to store values in lists
            result = {}

            # Iterate through the keys and add corresponding values to lists
            for key in all_keys:
                values = []

                if key in predictions:
                    values.append(predictions[key])

                if key in img_base64_dict:
                    values.append(img_base64_dict[key])

                result[key] = values

            return result, 200

        else:
            return "Error loading the model.", 400

    except Exception as e:
        return jsonify({"Error": str(e)}), 400


@bp.route('/infoModel', methods=['POST'])
def info_model():
    try:
        data = request.json
        name_model_model = data["model"]
        vision = data["vision"]  # global, local or all

        dict_info = general.get_info_model(name_model_model, vision)

        if not dict_info:
            return jsonify("Error: The dictionary is empty."), 400
        else:
            return dict_info
    except Exception as e:
        return jsonify({"Error": str(e)}), 400
