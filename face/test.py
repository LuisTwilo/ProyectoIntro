import cv2
import numpy as np
import os 

# name = 'Ana'
# print('welcome '+ name)
# parentPath = "/Users/luis/Documents/FacialRec/face/imagenes"
# path = os.path.join(parentPath,name)
# os.mkdir(path)

#cap = cv2.VideoCapture(0)


	#ret,frame = cap.read()
frame = cv2.imread('luis.jpeg')
print(frame)
cv2.imshow('frame',frame) #display the captured image
		

