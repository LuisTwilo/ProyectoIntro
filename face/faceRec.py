import numpy as np
import cv2
import pickle
import base64
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os 
import mysql.connector


def convert(imgBase64):
	image =  imgBase64 
	decoded_data = base64.b64decode(image)
	np_data = np.frombuffer(decoded_data,np.uint8)
	img = cv2.imdecode(np_data,cv2.IMREAD_UNCHANGED)
	return img

def GetEmployee(id_):
	connection = mysql.connector.connect(user="root",
										password="Password",
										host="192.168.1.4",
										port="3306",
										database="facerec")
	cursor = connection.cursor()

	query = f"SELECT firstName, secondName, lastName, lastArrival FROM employee WHERE Id = '{id_}'"

	cursor.execute(query)
	result = cursor.fetchall()
	ret = None
	if result:
		for row in result:
			firstName = row[0]
			secondName = row[1]
			lastName = row[2]
			lastArrival = None
			if row[3]:
				lastArrival = row[3].strftime("%b %d %Y %H:%M:%S")
		ret = {"firstName": firstName, "secondName": secondName, "lastName": lastName, "lastArrival": lastArrival}

		queryUpdate = f"Update Employee SET lastArrival = NOW() WHERE Id = '{id_}'"
		cursor.execute(queryUpdate)
		connection.commit()
		cursor.close()
		connection.close()

	return ret


# We define the path of the current file, we will use it later
FILE_PATH = os.path.dirname(os.path.realpath(__file__))


# * ---------- Create App --------- *
# Init the app
app = Flask(__name__)
# To avoid cors erros
CORS(app, support_credentials=True)

@app.route('/receive_data', methods=['POST'])
def get_frames():
	if request.method == 'POST':
		json_data = request.get_json()
		faceCascade = cv2.CascadeClassifier('C:/Users/luis/Documents/FacialRec/face/cascades/data/haarcascade_frontalface_alt2.xml')
		recognizer = cv2.face.LBPHFaceRecognizer_create()
		recognizer.read("trainner.yml")
		close = False

		#labels = {"person name": 1}

		#with open("labels.pickle", 'rb') as f:
			#ogLabels = pickle.load(f)
			#labels = {v:k for k,v in ogLabels.items()}


		while(close == False):
			
			#capturing frames
		
			frame = convert(json_data['image'])
			
			#converting from rgb to gray scale
			gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
			#print(gray)

			faces = faceCascade.detectMultiScale(gray, scaleFactor=1.5, minNeighbors=5) 
			
			if len(faces) != 0:
				for (x,y,w,h) in faces:
					roiGray = gray[y:y+h, x:x+w]
					roiColor = frame[y:y+h, x:x+w]

					id_, conf = recognizer.predict(roiGray)
					if conf >= 45:
						print (id_)
						res = GetEmployee(id_)
						return jsonify(flagRec = True, flagComing = True, data = res )
						close = True
						

			else:
				res = {"firstName": "unknown"}
				return jsonify(flagRec = False, flagComing = False, data = res )
				close = True
				
	

if __name__ == '__main__':
    # * --- DEBUG MODE: --- *
    app.run(host='0.0.0.0', port=5000, debug=True)
			

