# hold message in a var
payload = str(message.decode('utf-8'))

# print payload var with message
print(payload)

# check if exist data in the payload
if payload:
    # convert string in obj
    obj = json.loads(payload)

    # switcher func
    def switcherMessage(args):

        # methods
        def toActive():
            global messageInit
            # hold in vars
            messageActive = obj.get("active")
            messageInit.update({"active": messageActive})

        def toMotorSpeed():
            global messageInit
            # hold in vars
            messageMotorSpeed = obj.get("motorSpeed")
            messageInit.update({"motorSpeed": messageMotorSpeed})

        def toColorValue():
            global messageInit
            # hold in vars
            messageColorValue = obj.get("colorValue")
            messageInit.update({"colorValue": messageColorValue})

        def default():
            return 'none of none'

        # dict switch
        switcher={
            'messageActive': toActive(),
            'messageMotorSpeed': toMotorSpeed(),
            'messageColorValue': toColorValue()
        }
        return switcher.get(args, default())

    # Driver program to switcher
    def wichMessage():
        if payload.find("active"):
            return 'messageActive'
        elif payload.find("motorSpeed"):
            return 'messageMotorSpeed'
        elif payload.find("colorValue"):
            return 'messageColorValue'

    # type of message var
    args = wichMessage()

    # run methods to fill vars
    switcherMessage(args)
    
    # run publish message
        