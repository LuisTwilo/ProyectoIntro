import RPi.GPIO as GPIO
import time
import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

GPIO.setmode(GPIO.BOARD)
GPIO.setup(12, GPIO.OUT)
GPIO.setwarnings(False)
GPIO.output(12, False)

FILE_PATH = os.path.dirname(os.path.realpath(__file__))

#initiating server
app = Flask(__name__)

CORS(app, support_credentials=True)

@app.route('/', methods=['GET'])
def send():
    return jsonify(data = 'hi')

@app.route('/open_door', methods=['POST'])
def openDoor():
    if request.method == 'POST':
        GPIO.output(12, False)
        onOff = True
        p= GPIO.PWM(12,50)
        p.start(7.5)

        if onOff:
            p.ChangeDutyCycle(7.5)
            time.sleep(1)
            p.ChangeDutyCycle(1.5)
            time.sleep(10)
            p.ChangeDutyCycle(7.5)
            time.sleep(1)
            p.stop()
            return jsonify(data = 'door opened')


if __name__ == '__main__':
    # * --- DEBUG MODE: --- *
    app.run(host='0.0.0.0', port=5000, debug=True)



