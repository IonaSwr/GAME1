const router = require('express').Router();
var fs = require('fs');
var {serverState} = require('./layout');
const { exec } = require('child_process');

router.get('/', main);
router.get('/changemainstyle', changemainstyle);
router.get('/getstate', getState);
router.get('/runcommand', runcommand);



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
      fs.readFile('api/tests.htm', 'utf8', (err, data) => {
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


function runcommand(req,res){
    const commandToRun = 'dir';
    exec(commandToRun, (error, stdout, stderr) => {
    if (error) {
        res.send(error.message);
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        res.send(stderr);
        console.error(`stderr: ${stderr}`);
        return;
    }
    var restxt = stdout.replace(new RegExp("\n", "g"),"<br/>")
    var restxt = restxt.replace(new RegExp("<DIR>", "g"),"DIR")
    res.send(restxt);
    console.log(`stdout: ${stdout}`);
    }); 
}     

console.log('index controller loaded ')

module.exports = router;