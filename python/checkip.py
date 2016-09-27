#!/usr/bin/env python3.5

from urllib.request import urlopen
from urllib.error import URLError
import json

#Begin imports for sending emails
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
#End imports for sending emails

#This is to assist with hiding a string
import base64

import subprocess

def stringToBase64(s):
    return base64.b64encode(s.encode('utf-8'))

def base64ToString(b):
    return base64.b64decode(b).decode('utf-8')

#Open file that contains ip address
savedip = open('myipis.txt', 'r+')

# Email address to send messages to
sendToThisEmail = open('../emailAddress.txt', 'r')

# Get local ip address
command="/sbin/ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'"
localIP = str ( subprocess.check_output(command, shell=True) )[2:-3]

#Begin function to send email if IP address is different
def sendmeaemail(myip): 
	fromaddr = "yourGmailAccount@gmail.com"
	toaddr = sendToThisEmail.read()
	msg = MIMEMultipart()
	msg['From'] = fromaddr
	msg['To'] = toaddr
	msg['Subject'] = "Audio Server IP: "+ myip
	 
	body = "[ CONTROLLING REMOTELY ]\n\n- Use this URL to stream your music to a device when not at home: http://"+ myip+":8000/cw.mp3\n- Use http://"+myip+ ":8001 in a web enabled device to control the audio server remotely. \n\n[ CONTROLLING LOCALLY ]\n\n- Use this URL to stream your music to a device when at home http://"+localIP+":8000/cw.mp3 \n- Use this URL to control your audio sever locally http://"+localIP+":8001\n\nPlease Do Not Respond To This Email\n\nThanks, Motion Design Studio\nhttp://mo-de.net\n011.1.215.645.2827"
	msg.attach(MIMEText(body, 'plain'))
	 
	server = smtplib.SMTP('smtp.gmail.com', 587)
	server.starttls()
	server.login(fromaddr, 'your_gmail_password')
	text = msg.as_string()
	server.sendmail(fromaddr, toaddr, text)
	server.quit()

#End function to send email if IP address is different


try:
	#url = 'http://api.hostip.info/get_json.php'
	url='https://api.ipify.org/?format=json'
	info = json.loads(urlopen(url, timeout = 15).read().decode('utf-8'))

	if (info['ip']== savedip.readline().strip()):
		print ('yes')
	else:
		#If IP address is different it is time to send a message
		print ('no')
		savedip.seek(0)
		savedip.truncate()
		savedip.write(info['ip'])
		sendmeaemail(info['ip'])
	savedip.close()

except URLError as e:
	print(e.reason, end=' ') # e.g. 'timed out'
	print('(are you connected to the internet?)')
except KeyboardInterrupt:
	pass


