import rsa
with open('rsa_private.pem','rb') as file:
    private_key = file.read()
pk = rsa.PrivateKey.load_pkcs1(private_key)
print(str(pk)[10:])
