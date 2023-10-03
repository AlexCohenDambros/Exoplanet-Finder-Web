import lightkurve as lk

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

