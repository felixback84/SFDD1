import json

# type of message var
typeMessage = ""
print(f"typeMessage - 1: {typeMessage}")

# global dict to hold telemtry
messageInit = {
    'thingId': 'CarlosTal84-Hilda-mggbCoK1pihIqDJzJf3T',
    'active': 'false',
    'motorSpeed': 0,
    'colorValue': {
                    "r":0,
                    "g":0,
                    "b":0
                }
}

# print init data dict
print(f"init var: {messageInit}")

# other func
def otherTask(data):
    print(f"after task: {data}")
    print(f"init var after task: {messageInit}")
    
# function to handle the receive message, always show something about config topic
def on_message():

    # message bin arrival
    # message =  b'{"active":"true"}'
    message = b'{"motorSpeed": 20}'
    # message =  b'{"colorValue":{"r":2,"g":10,"b":100}}'

    # hold message in a var
    payload = str(message.decode('utf-8'))

    # print payload var with message
    print(f"payload: {payload}")
    
    # Driver program to pick the item in the switcher
    def wichMessage():
        
        global typeMessage
        if payload.find("active") == 2:
            typeMessage = 'messageActive'
            
        elif payload.find("motorSpeed") == 2:
            typeMessage = 'messageMotorSpeed'
            
        elif payload.find("colorValue") == 2:
            typeMessage = 'messageColorValue'
        
        print(f"typeMessage - 2: {typeMessage}")
        
    # run it
    wichMessage()

    # check if exist data in the payload
    if payload:

        # convert string in obj
        obj = json.loads(payload)

        # switcher func
        def switcherMessage(args):

            # methods
            def toActive():

                global messageInit
                messageActive = obj.get("active")
                messageInit.update({"active": messageActive})
                active = messageInit.get("active")
                print(f"method: {active}")
                otherTask({"active": active})
                # return {"active": active}
                
            def toMotorSpeed():

                global messageInit
                messageMotorSpeed = obj.get("motorSpeed")
                messageInit.update({"motorSpeed": messageMotorSpeed})
                motorSpeed = messageInit.get("motorSpeed")
                print(f"method: {motorSpeed}")
                otherTask({"motorSpeed": motorSpeed})
                # return {"motorSpeed": motorSpeed}

            def toColorValue():

                global messageInit
                messageColorValue = obj.get("colorValue")
                messageInit.update({"colorValue": messageColorValue})
                colorValue = messageInit.get("colorValue")
                print(f"method: {colorValue}")
                otherTask({"colorValue": colorValue})
                # return {"colorValue": colorValue}
                
            # dict switcher filter
            if typeMessage != "":
                
                # vars to funcs
                toActiveVar = None
                toMotorSpeedVar = None
                toColorValueVar = None
                
                # checker of type of method to trigger
                if typeMessage == 'messageActive':
                    toActiveVar = toActive()
                elif typeMessage == 'messageMotorSpeed':
                    toMotorSpeedVar = toMotorSpeed()
                elif typeMessage == 'messageColorValue':
                    toColorValueVar = toColorValue()
                
                # dict switcher
                switcher={
                    'messageActive': toActiveVar,
                    'messageMotorSpeed': toMotorSpeedVar,
                    'messageColorValue': toColorValueVar
                }

                # switcher run
                return switcher.get(args, lambda:"Some shit")
            
        # type of message var
        args = typeMessage

        # run right method to fill init var
        switcherMessage(args)

        # other task to do
        # otherTask()

# run it
on_message()



