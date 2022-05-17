const express = require('express');
const responseBuilder = require('../Helper/responsebuilder');
function LoginValidator(req,res,next){
    let body = req.body;
    if(!body.email||!body.password){
      let result = responseBuilder.valueNotSufficient();
      res.send(result); 
    }
    else
    next();
}

module.exports={
    LoginValidator
}