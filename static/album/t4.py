import base64

import imageio
from PIL import Image

img = imageio.imread('sait_bayramli.jpg')
img = Image.fromarray(img).resize((60, 60))
img.save("/tmp/out.jpg", "JPEG")

with open("/tmp/out.jpg", "rb") as image_file:
    fin = image_file.read()
    encoded_string = base64.b64encode(fin)
print (encoded_string)

