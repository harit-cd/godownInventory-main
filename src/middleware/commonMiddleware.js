const express = require('express');
const commonHelper = require('../Helper/commonHelper');
const responseBuilder = require('../Helper/responsebuilder');
function decryption(req,res,next){
    let body = req.body;
    if(body.encryptedData){
        let plainText = commonHelper.decrypt(body.encryptedData);
        req.body = JSON.parse(plainText);
        next();    
    }
    else{
        let result = responseBuilder.valueNotSufficient();
        res.send(result);
    }
}

module.exports={
    decryption
}