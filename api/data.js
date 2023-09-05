const router = require('express').Router();
var fs = require('fs');

router.get('/', main);

var serverState = { inc : 0 } ;

function main(req,res)
{
    fs.readFile('api/layout.htm', 'utf8', (err, data) => {        
        serverState.inc++;
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        var modifiedHtml = data;
        fs.readFile('api/data.htm', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }           
            data = data.replace('{{serverState.inc}}',serverState.inc);
            const innerHtml = modifiedHtml.replace('{{body}}',data);
            res.send(innerHtml);
        });
    });
}

console.log('data controller loaded ');
module.exports = router;