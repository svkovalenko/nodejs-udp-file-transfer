const dgram = require('dgram');
const fs = require('fs');

const PORT = 41230;
const SERVER_IP = '127.0.0.1';
const FILE_PATH = 'test.txt';
const CHUNK_SIZE = 1024;

function sendFile() {
  const socket = dgram.createSocket('udp4');
  const stream = fs.createReadStream(FILE_PATH, { highWaterMark: CHUNK_SIZE });

  stream.on('data', (chunk) => {
    socket.send(chunk, 0, chunk.length, PORT, SERVER_IP, (err) => {
      if (err) console.error('Error sending data:', err);
    });
  });

  stream.on('end', () => {
    console.log('File has been fully sent');
    socket.close();
  });

  stream.on('error', (err) => {
    console.error('Error reading file:', err);
    socket.close();
  });
}

sendFile();