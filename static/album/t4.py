import base64, imageio, io
from PIL import Image

d = "/home/burak/Documents/Dropbox/Photos/2024/album"
img = imageio.imread(d + '/sait_bayramli.jpg')
img = Image.fromarray(img).resize((60, 60))
buffer = io.BytesIO()
img.save(buffer, "JPEG")
encoded_string = base64.b64encode(buffer.getvalue())
print (encoded_string)

