const { createDecipheriv, randomBytes } = require('crypto');

function decrypt(b64encodedMessage, aesKey) {
    const cipherTextBuffer = Buffer.from(b64encodedMessage, 'base64');
    const len = cipherTextBuffer.length;
    const recoveredIV = cipherTextBuffer.subarray(0, 16);
    const encryptedText = cipherTextBuffer.subarray(16, len - 16);
    const recoveredTag = cipherTextBuffer.subarray(len - 16, len);

    const decipher = createDecipheriv(
      'aes-256-gcm',
      aesKey,
      recoveredIV,
    );
    decipher.setAuthTag(recoveredTag);

    const decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return decrypted;
  }

  module.exports = { decrypt };