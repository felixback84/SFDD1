# Write your code here :-)
import subprocess
data = subprocess.check_output(['netsh','wlan','show','profiles']).decode('utf-8').split('\n')

profiles = [i.split(":")[1][1:-1] for i in data if "All User profile" in i]
for i in profiles:
    password=subprocess.check_output(['netsh','wlan','show','profile',i,'key=clear']).decode('utf-8').split('\n')
    password=[b.split(":")[1][1:-1] for b in password if "key Content" in b]
    try:
        print("{:<30}| {:<}".format(i,password[0]))
    except IndexError:
        print("{:<30}| {:<}".format(i,""))