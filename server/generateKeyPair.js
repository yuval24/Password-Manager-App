/**
 * This module will generate a public and private keypair and save to current directory
 * 
 * Make sure to save the private key elsewhere after generated!
 */
const crypto = require('crypto');
const fs = require('fs');

function genKeyPair() {
    
    // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096, // bits - standard for RSA keys
        publicKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1" 
            format: 'pem' // Most common formatting choice
        },
        privateKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1"
            format: 'pem' // Most common formatting choice
        }
    });

    // Create the public key file
    fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey); 
    
    // Create the private key file
    fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);

}

function getAESKey() {
    
    // Generate a random 32 byte string
    const aesKey = crypto.randomBytes(32);

    // Convert the AES key to a base64 string
    const aesKeyBase64 = aesKey.toString('base64');
    
    // Create a PEM-formatted string with the base64-encoded AES key
    const pemKey = `-----BEGIN AES KEY-----\n${aesKeyBase64}\n-----END AES KEY-----`;
    
    // Write the PEM-formatted AES key to a file
    fs.writeFileSync(__dirname + '/id_aesKey.pem', pemKey);
    


}

//getAESKey();
//genKeyPair();
// Generate the keypair
