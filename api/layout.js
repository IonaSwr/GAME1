var fs = require('fs');

var serverState = { inc : 0 ,
    mainStyle : "/css/bright.css",
    windowStyle : 1,
    windowStyles : {1:'/css/dark.css',2:'/css/bright.css'}
};

function renderLayout(controllername,req,res)
{
  fs.readFile('api/layout.htm', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    var modifiedHtml = data.replace('{{mainStyle}}',serverState.windowStyles[serverState.windowStyle]);
    fs.readFile('api/'+controllername+'.htm', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      var innerHtml = modifiedHtml.replace('{{body}}',data);
      res.send(innerHtml);
    });
  });
}

console.log('layout controller loaded ')

module.exports = {serverState,renderLayout};