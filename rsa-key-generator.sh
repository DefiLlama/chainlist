#!/bin/sh
if [ -z "$1" ]
  then
    echo "Please, specify key suffix"
    exit 1
fi
 
echo "Generating RSA key pair"
 
openssl genrsa -out private-$1.pem 2048
openssl rsa -in private-$1.pem -pubout -out public-$1.pem
openssl pkcs8 -topk8 -inform PEM -outform PEM -in private-$1.pem -out private-$1.p8.key -nocrypt
rm private-$1.pem
 
echo "Key pair is generated"
