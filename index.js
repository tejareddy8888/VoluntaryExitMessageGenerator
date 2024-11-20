const { PublicKey, SecretKey, verify, Signature } = require('@chainsafe/blst');

const { decrypt } = require('./decrypt');
const { holeskyChainConfig, mainnetChainConfig } = require('./constants');
const { VEMSerializer, SigningDataSerializer, DOMAIN_VOLUNTARY_EXIT, computeDomain } = require('./serializer');
require('dotenv').config();

const KEY = Buffer.from(process.env.AES_KEY, 'hex');
const vem = process.env.ENCRYPTED_VEM;

decryptedVEM = JSON.parse(decrypt(vem, KEY).toString('utf8'));

console.dir(decryptedVEM)

const pubKey = PublicKey.fromHex(process.env.PUBLIC_KEY);
const signature = Signature.fromHex(decryptedVEM.signature.slice(2))

// Create a BLSToExecutionChange Object
const vemJson = VEMSerializer.fromJson({
    epoch: decryptedVEM.message.epoch,
    validator_index: decryptedVEM.message.validator_index,
});

// Create a SigningData hashTreeRoot
const unsignedMessage = SigningDataSerializer.hashTreeRoot({
    objectRoot: VEMSerializer.hashTreeRoot(
        vemJson,
    ),
    // For Mainnet
    //   domain: computeDomain(DOMAIN_VOLUNTARY_EXIT, mainnetChainConfig),
    // For Holesky 
    domain: computeDomain(DOMAIN_VOLUNTARY_EXIT, holeskyChainConfig),
});

// const sk = SecretKey.fromKeygen(randomBytes(32));
// const pk = sk.toPublicKey();
// const sig = sk.sign(unsignedMessage);
// console.log(pk.toHex())
// console.log(sig.toHex())
// console.log(verify(unsignedMessage, pk, sig))

console.log(vemJson)
console.log(unsignedMessage)
console.log(signature.toHex())
console.log(pubKey.toHex())

console.log('You can see validator here: https://beaconcha.in/validator/' + decryptedVEM.message.validator_index)
console.log('Decrypted message is', decryptedVEM)
console.log("Is valid: ", verify(unsignedMessage, pubKey, signature));
