Node.js UDP File Transfer

This project demonstrates a simple file transfer implementation using UDP in Node.js.

The application consists of two parts:
	•	UDP Server – receives file chunks and writes them to a file.
	•	UDP Client – reads a file and sends it to the server in chunks.

Technologies
	•	Node.js
	•	UDP sockets (dgram module)
	•	File streams (fs module)

Project Structure

node-udp/
│
├── udp-server.js   # UDP server that receives file data
├── udp-client.js   # UDP client that sends file data
├── test.txt        # Example file to send
└── README.md

How It Works
	1.	The client reads a file using a readable stream.
	2.	The file is split into small chunks.
	3.	Each chunk is sent to the server using UDP packets.
	4.	The server receives the packets and writes them into a file.
	5.	When the client finishes sending the file, it sends a special __END__ message.
	6.	The server closes the file stream.

Running the Server

Start the UDP server:

node udp-server.js

The server will listen on port 41230.

Running the Client

In another terminal, start the client:

node udp-client.js

The client will read test.txt and send its contents to the server.

Notes
	•	UDP does not guarantee delivery of packets.
	•	This example is intended for learning purposes.
	•	Large files may require additional logic for reliability.

Author

Serhii Kovalenko
