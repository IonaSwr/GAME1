const router = require('express').Router();
var fs = require('fs');
var {serverState,renderLayout} = require('./layout');
var controllerName = 'home';


router.get('/', main);
router.get('/changemainstyle', changemainstyle);
router.get('/getstate', getState);

function main(req, res)  {
    renderLayout(controllerName,req, res);
}

function changemainstyle(req,res){
    if(req.query.change=='true')
    {
        if(serverState.windowStyle == 1)        
            serverState.windowStyle = 2;                    
        else        
            serverState.windowStyle = 1;
    }        
    res.send( JSON.stringify( serverState ) )
}

function getState(req,res){      
    res.send( JSON.stringify( serverState ) )
}

console.log('index controller loaded ')

module.exports = router;