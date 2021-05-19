from flask import Flask, render_template, redirect, url_for,request
from flask import make_response
app = Flask(__name__)
# Code to execute from remote computer. Make sure to have the Raspberry Pi configured for Remote GPIO
# see here https://gpiozero.readthedocs.io/en/stable/remote_gpio.html for more
from gpiozero import Servo
from gpiozero.pins.pigpio import PiGPIOFactory
from time import sleep

factory = PiGPIOFactory(host='192.168.0.130') #Set host to IP of your RaspPi

myGPIO=17 #pin 17 for PWM control
servo = Servo(myGPIO, pin_factory=factory)

servo.value = -1

@app.route('/request', methods=['GET', 'POST'])
def handle():
    
    def toggleComputer():
        servo.value = -0.25
        sleep(0.2)
        servo.value = -1

    toggleComputer() #Turn off computer
    sleep(20)
    toggleComputer() #Turn on computer
    return "cool this works"
#    if request.method == 'POST':
#         print('hello world')
#         return "hi"


if __name__ == "__main__":
    app.run(debug = True, host="0.0.0.0")