import express from "express"
import dotenv from "dotenv"
import http from "http"
import {Server} from "socket.io" //if we want to export many function give same name in {} of import


// dotenv file loads variables from .env into process.env
dotenv.config();

const app = express();
const port = process.env.PORT || 5000; 

const server=http.createServer(app);


const io = new Server(server, {
  cors: {
      allowedHeaders: ["*"],
      origin: "*"
        }
});

io.on('connection',(socket)=>{

  console.log(`Client  Connected ${socket}`);

  const username=socket.handshake.query.username;

  console.log("user name="+username);

  socket.on('chat msg',(msg)=>{
    console.log("Receieved Message "+msg);
    // send message to itself also
    // io.emit('chat msg',msg);

    socket.broadcast.emit('chat msg',msg);


  });

});

// Define a route
app.get('/', (req, res) => {
  res.send('Congratulations Server Created :) !');
});

app.get('/DSA', (req, res) => {
  res.send('Prepare DSA for Product based companies !');
});

// Start the server
server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});