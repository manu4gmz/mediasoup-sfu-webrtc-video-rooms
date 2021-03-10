var udp = require('dgram');

const port = process.argv.indexOf("--port") != -1 ? process.argv[process.argv.indexOf("--port")+1] || 2222 : 2222;
const address = process.argv.indexOf("--address") != -1 ? process.argv[process.argv.indexOf("--address")+1] || "localhost" : "localhost";

// --------------------creating a udp server --------------------

// creating a udp server
var server = udp.createSocket('udp4');

// emits when any error occurs
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});

// emits on new datagram msg
server.on('message',function(msg,info){
  console.log(`Message received from ${info.address}:${info.port} (${msg.length}) "${msg.toString()}"`);
  //sending msg
  server.send(msg,info.port,address,function(error){
    if(error) client.close();
    else console.log(`Message replied to ${info.address}:${info.port}`);

  });

});

//emits when socket is ready and listening for datagram msgs
server.on('listening',function(){
  const { port, family, address: ipaddr } = server.address();
  console.log(`Created UDP Server\nListening at ${ipaddr}:${port} (${address}) ${family}`)
});

//emits after the socket is closed using socket.close();
server.on('close',function(){
  console.log('Socket is closed !');
});

server.bind(port);


// setTimeout(function(){
// server.close();
// },8000);