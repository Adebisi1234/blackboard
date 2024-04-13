function connect() {
  const ws = new WebSocket("ws://localhost:8080");
  ws.onopen = function () {
    // subscribe to some channels
    ws.send(
      JSON.stringify({
        //.... some message the I must send when I connect ....
      })
    );
  };

  ws.onmessage = function (e) {
    console.log("Message:", e.data);
  };

  ws.onclose = function (e) {
    console.log(
      "Socket is closed. Reconnect will be attempted in 1 second.",
      e.reason
    );
    setTimeout(function () {
      connect();
    }, 1000);
  };

  ws.onerror = function (err: any) {
    console.error("Socket encountered error: ", err.message, "Closing socket");
    ws.close();
  };
}

connect();

//There's ping pong dudeeee


// the time out is mainly added as an easy way to avoid too aggressive reconnect when the server is not availble, i.e. broken network, or shutdown of local debug server. But in general, I think an immediate reconnect followed by exponentially growing wait time for reconnect would be slightly better choice than fixed 1sec wait.

//setTimeout(connect,1000) is a more concise, resource efficient way of delaying the reconnect. also consider using setTimeout (connect ,Math.min(10000,timeout+=timeout)), resetting timeout to 250 before first connect and after every successful connect. this way error conditions during connect will add a backoff, but will quickly reconnect if it is a one time error situation - 250,500,1000,2000,4000,8000,10000,10000 msec delays is less agressive, but faster responding than 1000,1000,1000 msec – 
//unsynchronized
 