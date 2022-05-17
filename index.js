const express = require('express');
const godown = require('./src/Godown/godowns.json');
const route = require('./src/GodownRouter/routes')
var bodyParser = require('body-parser');
const { json } = require('express/lib/response');
const { request } = require('http');
const res = require('express/lib/response');
const PORT = 5000;
const responsebuilder = require('./src/Helper/responsebuilder');

const app = express();
console.log("Welcome");
app.listen(PORT , ()=> console.log(`server listening to http://localhost:${PORT}`));

// for(let elem of godown){
//     if(elem.godownId==request.params.godownId){
//         res.send(elem);
//     }
// }

//GET GODOWN BY LOCATION
app.get('/Godowns/:godownLocation' ,
        async(request , response) => {
            const getGodownByLoc = await godown.filter(e => e.godownLocation == request.params.godownLocation);
            response.json(getGodownByLoc);
        })
//GET GODOWN BY ID
app.get('/Godowns/godownId/:godownId' ,
        async(request , response) => {
            const getGodownById = await godown.filter(e => e.godownId == request.params.godownId);
            // response.send('GODOWN ID CALLED');
            response.json(getGodownById);
        })
app.use(bodyParser.json());
//ADDING GODOWN
app.use('/Godown', route);
//GET ALL GODOWNS
app.use('/Godown', route);