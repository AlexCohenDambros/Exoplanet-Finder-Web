# ============= Imports =============
import queue
import glob
import numpy as np
import pandas as pd
import lightkurve as lk
from io import StringIO
import pickle

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

def open_data_candidates(name_telescope, ids_targets_candidates):
    
    """
    Description:
        Function used to load data from space telescopes.

    Parameters:
        name_telescope: string
            Name of the telescope you want to load the data.
        ids_targets_candidates: List
            List targets candidates
            
    Return:
        pandas.DataFrame
            Dataframe containing candidate target data.
    """
    
    # ============= Input validation =============
    name_telescope = name_telescope.upper()
    
    if not isinstance(name_telescope, str):
        raise TypeError("name_telescope must be a string.")
    
    if name_telescope not in ["K2", "KEPLER", "TESS"]:
        raise ValueError("The telescope name must be one of the following: 'K2', 'Kepler' or 'TESS'.")

    if not isinstance(ids_targets_candidates, list):
        raise ValueError("Input must be a list.")
    # ============= Open Datasets =============
    
    dataset_telescope = read_dataset(name_telescope)

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
    if name_telescope in telescope_info:
        info = telescope_info[name_telescope]
        
        if info['drop_method'] is not None:
            dataset_telescope = dataset_telescope[dataset_telescope['discoverymethod'] != info['drop_method']]
        
        dataset_telescope.rename(columns=info['rename_columns'], inplace=True)
        dataset_telescope = dataset_telescope[info['select_columns']]
    
    dataset_telescope = dataset_telescope[dataset_telescope['disposition'].isin(['CANDIDATE'])]

    dataset_telescope = dataset_telescope[dataset_telescope['id_target'].isin(map(int, ids_targets_candidates))]
    
    return dataset_telescope

def process_target(name_telescope, row, vision):
    
    """
    Description:
       This function is used to download and pre-process the target data passed as a parameter. Data can be downloaded from TESS, K2 and KEPLER telescopes

    Parameters:
        name_telescope: telescope name.
        row: row containing telescope data.
        
    Return:
        lc_local.flux.value and lc_global.flux.value
        Error = -1
    """

    id_target = row[0]
    period = row[2]
    duration = row[3]
    
    try:
        t0 = row[4]
    except IndexError:
        t0 = None
        
    try:
        if name_telescope == 'Kepler':
            id_target = 'KIC ' + str(id_target)
            author_name = "Kepler"
        elif name_telescope == 'TESS':
            id_target = 'TIC ' + str(id_target)
            author_name = "SPOC"
            
        else:
            return - 1
        
        lcs = lk.search_lightcurve(id_target, author= author_name, cadence='long').download_all()
        
        print(lcs)
        
        if lcs is not None:
            
            # This method concatenates all quarters in our LightCurveCollection together, and normalizes them at the same time.
            lc_raw = lcs.stitch()

            # Clean outliers, but only those that are above the mean level (e.g. attributable to stellar flares or cosmic rays).
            lc_clean = lc_raw.remove_outliers(sigma=20, sigma_upper=4)
            
            # We have to mask the transit to avoid self-subtraction the genuine planet signal when we flatten the lightcurve. We have to do a hack to find where the time series should be masked.
            if t0 is not None:
                temp_fold = lc_clean.fold(period, epoch_time=t0)
            else:
                temp_fold = lc_clean.fold(period)
                
            fractional_duration = (duration / 24.0) / period
            phase_mask = np.abs(temp_fold.phase.value) < (
                fractional_duration * 1.5)
            transit_mask = np.in1d(lc_clean.time.value,
                                   temp_fold.time_original.value[phase_mask])
            
            lc_flat, _ = lc_clean.flatten(
                return_trend=True, mask=transit_mask)
            
            # Now fold the cleaned, flattened lightcurve:
            if t0 is not None:
                lc_fold = lc_flat.fold(period, epoch_time=t0)
            else:
                lc_fold = lc_flat.fold(period)
                
            
            if "Global" == vision or "Ambas" == vision:
               # ============= Defining global curves =============
                lc_global = lc_fold.bin(bins=2001).normalize() - 1
                lc_global = (lc_global / np.abs(lc_global.flux.min())) * 2.0 + 1

            if "Local" == vision or "Ambas" == vision:
                 # ============= Defining global curves =============
                phase_mask = (lc_fold.phase > -4 * fractional_duration) & (lc_fold.phase < 4.0 * fractional_duration)
                lc_zoom = lc_fold[phase_mask]
                lc_local = lc_zoom.bin(bins=201).normalize() - 1
                lc_local = (lc_local / np.abs(np.nanmin(lc_local.flux))) * 2.0 + 1

            return (row[1], lc_local.flux.value, lc_global.flux.value)

        else:
            print("Error downloading target data:", id_target)
            return -1

    except Exception as error:
        print(f"Failed at id: {id_target} | Error: {error}")
        return -1


def process_threads(processinQqueue, answerQueue, finishedTheLines, name_telescope, vision):
    
    """
    Description:
        This function processes queue data in Multithreading.

    Parameters:
        - processinQqueue: Input queue containing the data to be processed.
        - answerQueue: Output queue that receives the processing results.
        - finishTheLines: Flag indicating whether all lines were processed.
        - name_telescope: Accepted name.

    Return:
        None.
    """
    
    while True:
        try:
            row = processinQqueue.get(timeout=0.01)

        except queue.Empty:
            if finishedTheLines.is_set():
                break

            else:
                continue

        if row is None:
            continue

        result = process_target(name_telescope, row, vision)

        if result == -1:
            continue

        answerQueue.put_nowait(result)

    answerQueue.put_nowait("ts")
    

def predict_target_candidate():
    print("test")
