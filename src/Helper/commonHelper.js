let aes256 = require('aes256');

var key = "My godown";

function encrypt(plainText){
    let encryptedText = aes256.encrypt(key,plainText);
    return  encryptedText;
}
function decrypt(encryptedText){
    let plainText = aes256.decrypt(key,encryptedText);
    return plainText;
}

module.exports={
    encrypt,
    decrypt
}