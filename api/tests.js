const router = require('express').Router();
var fs = require('fs');
const { exec } = require('child_process');

router.get('/', main);
router.get('/runcommand', runcommand);

function main(req,res)
{
    fs.readFile('api/layout.htm', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        var modifiedHtml = data;
        fs.readFile('api/tests.htm', 'utf8', (err, data) => {
            if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
            }
            const innerHtml = modifiedHtml.replace('{{body}}',data) ;  
            res.send(innerHtml);
        });
    });
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

console.log('tests controller loaded ')
module.exports = router;