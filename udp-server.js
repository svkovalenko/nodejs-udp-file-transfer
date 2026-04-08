const dgram = require('dgram');
const fs = require('fs');
const path = require('path');

const PORT = 41230;
const server = dgram.createSocket('udp4');

// Store write streams for each client
const clientStreams = {};

server.on('message', (msg, rinfo) => {
  const clientId = `${rinfo.address}:${rinfo.port}`;

  // Check for the end-of-file signal
  const endSignal = msg.toString() === '__END__';

  if (endSignal) {
    console.log(`File transfer completed from ${clientId}`);

    if (clientStreams[clientId]) {
      clientStreams[clientId].end(); // Close the stream
      delete clientStreams[clientId]; // Remove from memory
    }

    return;
  }

  // If the stream is not yet created for this client, create a new file
  if (!clientStreams[clientId]) {
    const fileName = `file_${Date.now()}_${rinfo.address.replace(/\./g,'_')}.txt`;
    const filePath = path.join(__dirname, fileName);

    clientStreams[clientId] = fs.createWriteStream(filePath);

    console.log(`Receiving file from ${clientId} -> ${fileName}`);
  }

  // Write received data to the stream
  clientStreams[clientId].write(msg);
});

server.on('listening', () => {
  const address = server.address();
  
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.bind(PORT);