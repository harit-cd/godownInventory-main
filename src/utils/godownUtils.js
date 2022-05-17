const { builtinModules } = require('module');
const godown = require('../Godown/godowns.json');
const responsebuilder = require('../Helper/responsebuilder');
const commonHelper = require('../Helper/commonHelper');
const res = require('express/lib/response');
const fs =require('fs');
function getByValue(body){
    let result = [];
        for(let elem of godown){
            if(elem.godownId == body.godownId){
                result.push(elem);
                let resp = responsebuilder.list(result);
                return resp;
            }
            else if(elem.godownLocation == body.godownLocation){
                result.push(elem);
                let resp = responsebuilder.list(result);
                return resp;
            }
        }
        if(result==0){
            let resp = responsebuilder.noValue();
            return resp;
        } 
}
function encryptGodown(body){
    let result = commonHelper.encrypt(body);
    let resp = responsebuilder.list(result);
    return resp;
}
function decryptGodown(encryptData){
    let decryptData  = commonHelper.decrypt(encryptData);
    let result = JSON.parse(decryptData);
    let resp = responsebuilder.list(result);
    return resp;
}
function loginGodown(body){
    let result= [];
    // let num = 1;
    if(result == 0){
        for(let elem of godown){
            if(elem.email==body.email && elem.password==body.password){
                result.push(elem);
                if(elem.role=='admin'){
                    let token = {
                        role:elem.role,
                        exp:Date.now() + (30*1000)
                    }
                    let res ={
                        data:result,
                        AuthToken: commonHelper.encrypt(JSON.stringify(token))
                    }
                    let resp = responsebuilder.list(res);
                    return resp;
                }
                let resp = responsebuilder.list(result);
                    return resp;
            }
        }
        if(result == 0){
            let result = responsebuilder.noValue()
            return result;
    }
}
}
function godownRole(body){
    if(!body.authToken||!body.godownId||!body.role){
        let resp = responsebuilder.valueNotSufficient();
        return resp;
    }
    let AuthToken= JSON.parse(commonHelper.decrypt(body.authToken));
    let exp = AuthToken.exp;
    let timeDiff = Date.now() - exp;
    let role = body.role;
    let id = body.godownId;
    if(timeDiff<0){
    for(let elem of godown){
        if(id==elem.godownId){
            elem.role=role;
            let data = JSON.stringify(godown,null,2)
            let path ='src/Godown/godowns.json';
            fs.writeFile(path,data,'utf8',(err)=>{
                if(err) throw err;
            })
            let resp = responsebuilder.list(elem);
            return resp;
        }
    }
    }
    else{
        let resp = responsebuilder.expired();
        return resp;
    }

}
module.exports = {
    getByValue,
    encryptGodown,
    decryptGodown,
    loginGodown,
    godownRole
}