# ============= Imports =============

import glob
import pandas as pd
import lightkurve as lk
from io import StringIO
import joblib
import base64
import matplotlib.pyplot as plt
import io

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

    # Initialize a dictionary for sectors and authors
    sectors_dict = {}

    # Loop through the search results
    for index in search_result:
        # Get the sector number from the text
        mission = index.mission[0]
        sector = mission.split()[-1]
        author = index.author[0]
        
        # Add the sector and author to the sectors_dict
        if sector.isdigit():
            sector_num = int(sector)
            if sector_num not in sectors_dict:
                sectors_dict[sector_num] = set()  # Usar um conjunto para garantir valores únicos
            sectors_dict[sector_num].add(author)

    # Converter o conjunto de autores de volta em lista
    for sector_num, authors_set in sectors_dict.items():
        sectors_dict[sector_num] = list(authors_set)

    # Add sectors_dict to the final dictionary
    final_dict[tic] = sectors_dict

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
    
    img_base64_dict = {}

    # Loop to iterate through each row of the DataFrame
    for index, row in df.iterrows():
        # Extract all values from the row except for the 'label' and 'target' columns
        flux_values = row.drop(['label', 'target']).values

        # Create the scatter plot
        plt.scatter(range(len(flux_values)), flux_values, s=10, alpha=0.5, c='k')
        plt.xlabel('Phase [JD]')
        plt.ylabel('Normalized Flux')
        plt.title(f'Scatter Plot of Normalized Flux for {row["label"]} ({row["target"]})')

        # Save the plot to a byte buffer
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png')
        buffer.seek(0)

        # Convert the image to base64
        img_base64 = base64.b64encode(buffer.read()).decode('utf-8')

        # Store the base64 image in the dictionary with the key being the value of the 'target' column
        img_base64_dict[row['target']] = img_base64

        # Clear the current plot
        plt.clf()

    # Remove the 'label' column from the DataFrame
    df = df.drop(columns=['label'])
    
    return df, img_base64_dict

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
    
def get_info_model(name_model, vision):
    # Convert vision to lowercase for consistency
    vision = vision.lower()
    
    try:    
        # Define file paths for metrics and confusion matrix
        metrics_model = f'ModelResults/{name_model}/Result_{name_model}_{vision}.xlsx'
        confusion_matrix = f'ModelResults/{name_model}/ConfusionMatrix_{name_model}_{vision}.png'
    
        # Load the Excel file with model metrics
        metrics_df = pd.read_excel(metrics_model)
        
        # drop Unnamed: 0
        metrics_df.drop(["Unnamed: 0"], axis=1, inplace=True)
        
        
        # Open the image and convert it to base64
        with open(confusion_matrix, "rb") as image_file:
            image_base64 = base64.b64encode(image_file.read()).decode('utf-8')
        
        # Return a dictionary with the data
        result = {
            "metrics": metrics_df.to_dict(),
            "confusion_matrix_base64": image_base64
        }
        
        return result
    
    except FileNotFoundError as file_not_found_error:
        raise ValueError(f"File not found: {str(file_not_found_error)}")
    except pd.errors.ParserError as parser_error:
        raise ValueError(f"Error parsing Excel file: {str(parser_error)}")
    except Exception as e:
        raise ValueError(f"An error occurred: {str(e)}")
    
    
    
    
    