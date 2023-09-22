import os
import pandas as pd
import glob
from io import StringIO
from flask import request, Blueprint, jsonify, Response

bp = Blueprint('routes', __name__)

# Initialize a variable to store the received JSON data
received_json = ""


@bp.route('/')
def index():
    return jsonify({'message': 'Bem-vindo ao meu projeto Flask!'})


@bp.route('/datatelescope', methods=['GET'])
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
