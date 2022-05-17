const express =require('express');
const route = express.Router();
const godownController = require('../GodownController/godownController')
const godownMiddleware = require('../middleware/godownMiddleware');
const commonMiddleware = require('../middleware/commonMiddleware');
route.get('/', godownController.getAllGodowns);
route.get('/getByValue',godownController.getByValue )
route.post('/add', godownController.godownAdd);
route.get('/encrypt',godownController.encryptData);
route.get('/decrypt',godownController.decryptData);
route.post('/signUp',godownController.signUp);
route.get('/login',commonMiddleware.decryption,godownMiddleware.LoginValidator,godownController.login)
route.post('/assignRole',godownController.assignRole);
module.exports = route;
