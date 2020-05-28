import cv2
import numpy as np
import os 

# name = 'Ana'
# print('welcome '+ name)
# parentPath = "/Users/luis/Documents/FacialRec/face/imagenes"
# path = os.path.join(parentPath,name)
# os.mkdir(path)

cap = cv2.VideoCapture(0)

while(True):
	ret,frame = cap.read()
	cv2.imshow('frame',frame) #display the captured image

	if cv2.waitKey(20) & 0xFF == ord('y'):
		cv2.imwrite(path +'/c.png',frame)
		cv2.destroyAllWindows()
		break

cap.release()
