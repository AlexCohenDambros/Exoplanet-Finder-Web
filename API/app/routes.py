import os
from . import method_bls

import pandas as pd

from io import StringIO
import io
import base64

from flask import request, Blueprint, jsonify, Response

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

import lightkurve as lk

import glob

import warnings


# Suprimindo os warnings específicos
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

        # Check if the ID is empty or equal to TESS, K2, or Kepler
        if not received_id or received_id not in ["TESS", "K2", "KEPLER"]:
            return jsonify({"error": "Invalid ID value"}), 500

        # Define the CSV file path
        csv_file_path = f'Datasets/{received_id}/*.csv'

        telescope_csv_paths = glob.glob(csv_file_path)

        # Check if the file exists
        if not telescope_csv_paths:
            return jsonify({"error": "CSV file not found for the given ID"}), 404

        csv_data = ''
        with open(telescope_csv_paths[0], 'r') as f:
            csv_data = '\n'.join(
                list(filter(lambda a: not a.startswith('#'), f.readlines())))[1:]

        # Read the CSV file
        df = pd.read_csv(StringIO(csv_data), on_bad_lines='skip')

        if received_id == 'TESS':
            names_disp = {"FP": 'FALSE POSITIVE', "PC": 'CANDIDATE',
                          "CP": 'CONFIRMED', "FA": 'FALSE POSITIVE', "KP": 'CONFIRMED'}
            df.replace({'tfopwg_disp': names_disp}, inplace=True)

        # Convert the DataFrame to CSV format
        csv_data = df.to_csv(index=False)

        # Return CSV data as a response
        return Response(csv_data, mimetype='text/csv')

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@bp.route('/getTargets', methods=['POST'])
def get_targets():
    try:
        data = request.json
        received_id = data["id"].upper()

        # Check if the ID is empty or equal to TESS, K2, or Kepler
        if not received_id or received_id not in ["TESS", "K2", "KEPLER"]:
            return jsonify({"error": "Invalid ID value"}), 500

        # Define the CSV file path
        csv_file_path = f'Datasets/{received_id}/*.csv'

        telescope_csv_paths = glob.glob(csv_file_path)

        # Check if the file exists
        if not telescope_csv_paths:
            return jsonify({"error": "CSV file not found for the given ID"}), 404

        csv_data = ''
        with open(telescope_csv_paths[0], 'r') as f:
            csv_data = '\n'.join(
                list(filter(lambda a: not a.startswith('#'), f.readlines())))[1:]

        # Read the CSV file
        df = pd.read_csv(StringIO(csv_data), on_bad_lines='skip')

        # Defines the information dictionary for each telescope
        telescope_info = {
            "K2": {
                "drop_method": "Radial Velocity",
                "rename_columns": {
                    "tic_id": "id_target",
                    "pl_orbper": "period",
                    "pl_trandur": "duration"
                },
                "select_columns": ['id_target', 'disposition', 'period', 'duration']
            },
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

        list_targets = df["id_target"].unique().tolist()
        list_targets = list(map(str, list_targets))

        # Return JSON
        response_data = {"list_targets": list_targets}
        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 400


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
        return jsonify({"error": str(e)}), 400


@bp.route('/insertModel', methods=['POST'])
def insert_model():
    try:
        # Check if a file is included in the POST request
        if 'model' not in request.files:
            return jsonify({"error": "No file part"}), 400

        model_file = request.files['model']

        # Check if the file has a .pkl extension
        if not model_file.filename.endswith('.pkl'):
            return jsonify({"error": "Invalid file format. Please provide a .pkl file"}), 400

        # Save the model file to the specified folder
        os.makedirs("Models/ImportedModels", exist_ok=True)
        model_file.save(os.path.join("Models/ImportedModels", model_file.filename))
 
        return jsonify({"message": "Model uploaded successfully"}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@bp.route('/generateGraph', methods=['POST'])
def generate_graph():
    try:
        data = request.json
        id_target = data["id"]
        telescope = data["telescope"].upper()
        
        try:
            if telescope == 'Kepler':
                id_target = 'KIC ' + str(id_target)
            elif telescope == 'TESS':
                id_target = 'TIC ' + str(id_target)
            else:
                return jsonify({"error": "ID not recognized"}), 400
            
            lc = lk.search_lightcurve(id_target, cadence='long').download_all()
            
            if lc is not None:
                
                
                method_bls.data_bls(lc)
                
                
                
                # fig, ax = plt.subplots(figsize=(20, 10))
                
                # lcs.plot(ax= ax)
                
                # # Save the figure to a BytesIO object
                # img_buffer = io.BytesIO()
                # fig.savefig(img_buffer, format='png')
                # img_buffer.seek(0)
                
                # # Converts the figure to base64 representation
                # img_base64_flatten= base64.b64encode(img_buffer.read()).decode('utf-8')
                
                # plt.close(fig)
                # plt.clf()
                
                # return jsonify({"image_flatten": img_base64_flatten})
            
            else:
                return jsonify({"error": "No light curve data found"}), 404
            
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

