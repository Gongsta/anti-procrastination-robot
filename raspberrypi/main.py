#https://www.youtube.com/watch?v=1Ukz9CnJD7I
from gpiozero import Servo
from time import sleep

myGPIO=17

servo = Servo(myGPIO)
servo.min()

def shutComputer():
    servo.max()
    sleep(1)
    servo.min()

    #You can also use the value property to move the servo to a particular position, on a scale from -1 (min) to 1 (max) where 0 is the mid-point:
    #servo.value = 0.2