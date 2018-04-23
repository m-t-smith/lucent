const http = require('http');
const express = require('express');
const path = require('path');
//const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.use(express.static('client'));


app.use('/resources', express.static(path.join(__dirname, '/resources')));

app.get('/', function(req, res) {
  if (!res.getHeader('content-type')) {
    var charset = mim.charsets.getType();
    res.setHeader('Content-Type', type + (charset ? '; charset = ' + charset : '')); 
  }
  res.send('Hello world');
});

app.listen(port, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
})

/* fs.readFile('proto-test-index.html', (err, html) => {
  if(err){
    throw err;
  }
  
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(html);
    res.end();
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

}); */

