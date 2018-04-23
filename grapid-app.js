const http = require('http');
const express = require('express');
const path = require('path');
// const mime = require('mime');

//this is the address to connect to this node server on my computer on my home network, 
//it would have to be changed for any other situation
//get your ipv4 address with command ipconfig on windows command line 
const hostname = '192.168.1.39';
const port = 3000;

const grapidApp = express();

grapidApp.use(express.static('public'));


grapidApp.use('/resources', express.static(path.join(__dirname, '/resources')));

grapidApp.get('/', function(req, res) {
  /* if (!res.getHeader('content-type')) {
    var charset = mime.charsets.getType();
    res.setHeader('Content-Type', type + (charset ? '; charset = ' + charset : '')); 
  } */
});

grapidApp.listen(port, '0.0.0.0', function(){
  console.log(`Server running at http://${hostname}:${port}/`);
})

