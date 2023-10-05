# ============= Imports =============

import glob
import pandas as pd
import lightkurve as lk
from io import StringIO
import joblib
import xgboost as xgb

# ============= Functions =============

def getSectorsAuthors(tic, telescope):
    
    if telescope == 'KEPLER':
        tic = 'KIC ' + str(tic)
        
    elif telescope == 'TESS':
        tic = 'TIC ' + str(tic)
    
    # Use the search_lightcurve function to retrieve target data
    search_result = lk.search_lightcurve(tic, cadence='long')

    # Initialize the final dictionary
    final_dict = {}

    # Initialize empty lists for sectors and authors
    sectors = []
    authors = []

    # Loop through the search results
    for index in search_result:
        # Get the sector number from the text
        mission = index.mission[0]
        sector = mission.split()[-1]
        author = index.author[0]
        
        # Add the sector to the sectors list (if not already added)
        if sector.isdigit():
            sectors.append(sector)
            authors.append(author)

    # Add sectors and authors to the final dictionary
    final_dict[tic] = {'sectors': sectors, 'authors': authors}

    return final_dict

def read_dataset(telescope=None):

    # Check if the ID is empty or equal to TESS, K2, or Kepler
    if not telescope or telescope not in ["TESS", "K2", "KEPLER"]:
        # return jsonify({"error": "Invalid ID value"}), 500
        raise ValueError("Invalid telescope name.")

    # Define the CSV file path
    csv_file_path = f'Datasets/{telescope}/*.csv'

    telescope_csv_paths = glob.glob(csv_file_path)

    # Check if the file exists
    if not telescope_csv_paths:
        raise ValueError("CSV file not found for the given ID")

    csv_data = ''
    with open(telescope_csv_paths[0], 'r') as f:
        csv_data = '\n'.join(
            list(filter(lambda a: not a.startswith('#'), f.readlines())))[1:]

    # Read the CSV file
    df = pd.read_csv(StringIO(csv_data), on_bad_lines='skip')

    if telescope == 'TESS':
        names_disp = {"FP": 'FALSE POSITIVE', "PC": 'CANDIDATE',
                        "CP": 'CONFIRMED', "FA": 'FALSE POSITIVE', "KP": 'CONFIRMED'}
        df.replace({'tfopwg_disp': names_disp}, inplace=True)

    return df

def get_data_candidates(id_candidates, telescope, vision):
    
    # Check if the ID is empty or equal to TESS, K2, or Kepler
    if not telescope or telescope not in ["TESS", "KEPLER"]:
        # return jsonify({"error": "Invalid ID value"}), 500
        raise ValueError("Invalid telescope name.")
    
    if not id_candidates:
        raise ValueError("Invalid id candidates")
    
    if not vision:
        raise ValueError("Invalid vision")
    
    vision = vision.lower()
    telescope = telescope.upper()
    
    # Define the CSV file path
    csv_file_path = f'PreprocessedCandidate{telescope}/preprocessed_{vision}_view_candidate.csv'

    csv_paths = glob.glob(csv_file_path)

    # Check if the file exists
    if not csv_paths:
        raise ValueError("CSV file not found for the given ID")

    # Read the CSV file
    df = pd.read_csv(csv_paths[0])  # Assuming there's only one matching file
    
    if telescope == "TESS":
        # Add "TIC " in front of each number and create a list of target values
        id_candidates = ['TIC ' + str(num) for num in id_candidates]
        
    elif telescope == "KEPLER":
        # Add "KIC " in front of each number and create a list of target values
        id_candidates = ['KIC ' + str(num) for num in id_candidates]
        
    # Use the isin() method to filter the DataFrame based on the list of target values
    df = df[df['target'].isin(id_candidates)]
    
    # Remove the 'label' column from the DataFrame
    df = df.drop(columns=['label'])
    
    return df

def load_model(name_model, vision):
    vision = vision.lower()
    try:    
        # load model from pickle file
        model = joblib.load(f'Models/{name_model}/{name_model}_{vision}.pkl')
        return model
    
    except Exception as e:
        raise ValueError(f"Error loading the model: {str(e)}")

def predict_candidate(df, model):
    try:
        # Remove the 'target' column from the DataFrame
        df_no_target = df.drop("target", axis=1)
        
        # Make probability predictions
        predictions = model.predict_proba(df_no_target)[:, 1]
        
        # Create a dictionary mapping 'target' values to their corresponding probabilities
        result_dict = dict(zip(df["target"], predictions))
        
        return result_dict
    except Exception as e:
        raise ValueError(f"Error: {str(e)}")
