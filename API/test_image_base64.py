import base64
import io
import matplotlib.pyplot as plt
from PIL import Image

# # String base64 da imagem
# base64_image = ""

# # Decodifica a string base64 em bytes
# image_bytes = base64.b64decode(base64_image)

# # Lê os bytes da imagem usando a PIL (Python Imaging Library)
# image = Image.open(io.BytesIO(image_bytes))

# # Plota a imagem
# plt.imshow(image)
# plt.axis('off')  # Desativa as bordas do gráfico
# plt.show()



# # download the data using lightkurve first

# TIC = 'TIC 284475976' # !! CHANGE THIS for a different target

# # search what SPOC data is available for a given target - and chose a sector
# print("baixando")
# sector_data = lk.search_lightcurve(TIC, author = 'SPOC', sector = 23) # !! CHANEG THIS (see above)

# # download the data 
# lc = sector_data.download()
# print("baixouuuu")
# # run the BLS on this lightcurve 

# print("Entrou na funcao")
# df, plot1_image_base64, plot2_image_base64 = data_bls(lc)

# print("Some statistics about the two fits (these numbers are just estimates and should be taken with a large pinch of salt!)")
# print(df)

# print("Plot 1 (base64):")
# plot_base64(plot1_image_base64)

# print("Plot 2 (base64):")
# plot_base64(plot2_image_base64)

import lightkurve as lk

TIC = 'TIC 284475976'

# Use a função search_lightcurve para obter os dados do alvo
search_result = lk.search_lightcurve(TIC, cadence="long")

# Itere sobre os resultados para extrair informações sobre os setores
sectors = []
for result in search_result:
    sectors.append(result.sector)

# Converta a lista de setores em um conjunto para remover duplicatas
sectors = set(sectors)

# Imprima os setores disponíveis
print("Setores disponíveis para o alvo de observação:")
for sector in sorted(sectors):
    print(sector)
    