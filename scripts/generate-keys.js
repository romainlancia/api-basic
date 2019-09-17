const fs = require('fs')
const NodeRSA = require('node-rsa')
const pathPublicKey = '/../public.pem'
const pathPrivateKey = '/../private.pem'

try {
    console.log('console: checking for keys...')
    if (
        fs.existsSync(__dirname + pathPublicKey) === false ||
        fs.existsSync(__dirname + pathPrivateKey) === false
    ) {
        const key = new NodeRSA().generateKeyPair()
        const publicKey = key.exportKey('pkcs8-public-pem')
        const privateKey = key.exportKey('pkcs1-pem')
        console.log('console: no keys found, generating keys now...')
        fs.openSync(__dirname + pathPublicKey, 'w')
        fs.writeFileSync(__dirname + pathPublicKey, publicKey, 'utf8')
        fs.openSync(__dirname + pathPrivateKey, 'w')
        fs.writeFileSync(__dirname + pathPrivateKey, privateKey, 'utf8')
        console.log('console: keys created and store into keys directory!')
    } else {
        console.log('console: keys found, all good!')
    }
} catch (e) {
    console.log(e)
    process.exit(1)
}
