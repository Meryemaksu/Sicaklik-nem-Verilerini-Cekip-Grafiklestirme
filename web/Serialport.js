const express = require('express');
const app= express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const seriPort = new SerialPort("COM9", { baudRate: 9600 })
const parser = new Readline()

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use('/js', express.static(path.join(__dirname, 'js')))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

const webSunucuPortAdresi=8080;
http.listen(webSunucuPortAdresi, function(){
    console.log(webSunucuPortAdresi+': adresine istekte bulunun... ');
});

seriPort.pipe(parser)
parser.on('data', function (veri) {
    console.log("Veri:"+ veri);
    io.emit('alldata',veri);
})