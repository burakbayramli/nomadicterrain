


import Pil 
import Image
im = Image.open("test.jpg")
crop_rectangle = (50, 50, 200, 200)
cropped_im = im.crop(crop_rectangle)
cropped_im.show()

