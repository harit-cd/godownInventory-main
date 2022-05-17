const express = require('express');
const godown = require('../Godown/godowns.json');
const godownUtils =  require('../utils/godownUtils');
const commonHelper = require('../Helper/commonHelper');
const fs = require('fs');
const { emit } = require('process');

function getAllGodowns(request, response){
    response.send(godown);
}

function getGodownByName(request, respone){
    let data ;
}
function getByValue(req,res){
    let body = req.body;
    let result = godownUtils.getByValue(body);
    res.json(result);
}

function godownAdd(request , response){
            let body = request.body;
            // let result = JSON.stringify(body);
            body['godownid']= godown.length+1;
            body['role']='user';
            godown.push(body);
            let newGodown = JSON.stringify(godown, null, 2);
            fs.writeFile('src/Godown/godowns.json', newGodown, 'utf-8', (err)=>{
                if(err) throw err;
            })
            response.send(body);
}
function encryptData(request,response){
        let body = JSON.stringify(request.body);
        let result = godownUtils.encryptGodown(body);
        response.send(result);    
}
function decryptData(request,response){
    let encryptedData = request.body.encryptedData;
    let result = godownUtils.decryptGodown(encryptedData);
    response.send(result);    
}

function signUp(request,response){
    let body = request.body;
    let result = godownAdd(body);
    response.send(result);
}
function login(request,response){
    let body = request.body;
    let result = godownUtils.loginGodown(body);
    response.send(result);
}
function assignRole(request,response){
    let body = request.body;
    let result = godownUtils.godownRole(body);
    response.send(result);

}
module.exports = {
    godownAdd,
    getAllGodowns,
    getByValue,
    encryptData,
    decryptData,
    signUp,
    login,
    assignRole
}