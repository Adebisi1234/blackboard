import { WebSocket, WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });

interface ws extends WebSocket {
  id?: string;
  room?: string;
}

wss.on("connection", function connection(ws: ws, req) {
  if (!req.url) return;
  ws.room = req.url;
  ws.on("error", console.error);
  ws.on("message", function message(data, isBinary) {
    const processedData: { message: any; id: string } = JSON.parse(
      data.toString()
    );
    ws.id = processedData.id;

    wss.clients.forEach(function each(client: ws) {
      if (
        client.id !== ws.id &&
        client.room === ws.room &&
        client.readyState === ws.OPEN
      ) {
        client.send(JSON.stringify(processedData.message), {
          binary: isBinary,
        });
      }
    });
  });
});
// import { createServer } from 'https';
// import { readFileSync } from 'fs';
// import { WebSocketServer } from 'ws';
// const server = createServer({
//   cert: readFileSync('/path/to/cert.pem'),
//   key: readFileSync('/path/to/key.pem')
// });
// const wss = new WebSocketServer({ server });
// wss.on('connection', function connection(ws) {
//   ws.on('error', console.error);
//   ws.on('message', function message(data) {
//     console.log('received: %s', data);
//   });
//   ws.send('something');
// });
// server.listen(8080);
/*
Multiple servers sharing a single HTTP/S server
import { createServer } from 'http';
import { parse } from 'url';
import { WebSocketServer } from 'ws';

const server = createServer();
const wss1 = new WebSocketServer({ noServer: true });
const wss2 = new WebSocketServer({ noServer: true });

wss1.on('connection', function connection(ws) {
  ws.on('error', console.error);

  // ...
});

wss2.on('connection', function connection(ws) {
  ws.on('error', console.error);

  // ...
});

server.on('upgrade', function upgrade(request, socket, head) {
  const { pathname } = parse(request.url);

  if (pathname === '/foo') {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request);
    });
  } else if (pathname === '/bar') {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(8080);


import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});



A client WebSocket broadcasting to every other connected WebSocket clients, excluding itself.

import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});*/