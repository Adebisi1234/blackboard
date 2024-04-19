import { WebSocket, WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });

interface ws extends WebSocket {
  id?: string;
  room?: string;
}

wss.on("listening", () => {
  console.log("Websocket server started");
});

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

// Handle case of a new client joining later on, sending all the previous data to the new client
