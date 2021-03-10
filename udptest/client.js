var udp = require('dgram');

const port = process.argv.indexOf("--port") != -1 ? process.argv[process.argv.indexOf("--port")+1] || 2222 : 2222;
const address = process.argv.indexOf("--address") != -1 ? process.argv[process.argv.indexOf("--address")+1] || "localhost" : "localhost";
const message = process.argv.indexOf("--message") != -1 ? process.argv[process.argv.indexOf("--message")+1] : (console.log("No message specified") || process.exit());


var buffer = require('buffer');

// creating a client socket
var client = udp.createSocket('udp4');

//buffer msg
var data = Buffer.from(message);

client.on('message',function(msg,info){
  console.log(`Data replied from server (${msg.length}) "${msg.toString()}"`);
});

//sending msg
client.send(data,port,address,function(error){
  if(error){
    console.log(error);
    client.close();
  }else{
    console.log(`Message sent: "${message}"`);
  }
});

// var data1 = Buffer.from('hello');
// var data2 = Buffer.from('world');

// //sending multiple msg
// client.send([data1,data2],2222,address,function(error){
//   if(error){
//     client.close();
//   }else{
//     console.log('Data sent !!!');
//   }
// });