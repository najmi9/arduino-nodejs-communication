import http from 'http';
import fs from 'fs';
import { SerialPort } from 'serialport';
import { Server } from "socket.io";

const PATH = '/dev/ttyACM0';
const HTML_FILE_PATH = 'index.html';
const VALID_PASSWORD = '1234ABCD';

const port = new SerialPort({
    path: PATH,
    baudRate: 9600,
});

port.on('error', function(err) {
    console.log('Error: ', err.message)
});

const index = fs.readFileSync(HTML_FILE_PATH);
const app = http.createServer(function(req, res) {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        return req.on('end', () => {
          const password = body.trim().replace('password=', '');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            isPasswordValid: VALID_PASSWORD === password
          }));
        });
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

const io = new Server(app);

port.on('data', function(data) {
    console.log('Received data from port: ' + data);
    io.emit('data', data);
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
