const router = require('express').Router();
var fs = require('fs');
var {serverState} = require('./layout');

router.get('/', main);
router.get('/changemainstyle', changemainstyle);
router.get('/getstate', getState);


// var serverState = { inc : 0 ,
//     mainStyle : "/css/bright.css",
//     windowStyle : 1,
//     windowStyles : {1:'/css/dark.css',2:'/css/bright.css'}
// };

function main(req, res)  {
    fs.readFile('api/layout.htm', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      var modifiedHtml = data.replace('{{mainStyle}}',serverState.windowStyles[serverState.windowStyle]);
      fs.readFile('api/data.htm', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
        var innerHtml = modifiedHtml.replace('{{body}}',data);
        res.send(innerHtml);
      });
    });
  };

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
router.main = main;
module.exports = router;