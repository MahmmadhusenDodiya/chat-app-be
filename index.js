import express from "express"
import dotenv from "dotenv"
import http from "http"
import {Server} from "socket.io" //if we want to export many function give same name in {} of import
import connectToMongoDB from "./db/connectToMongo.js";
import { addMsgToConversation } from "./controllers/msgs.controller.js";
import router from "./routes/msgs.route.js";
import cors from "cors"



// dotenv file loads variables from .env into process.env
dotenv.config();

const app = express();
const port = process.env.PORT || 8080; 

const server=http.createServer(app);


const io = new Server(server, {
  cors: {
      allowedHeaders: ["*"],
      origin: "*"
        }
});


app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000",  "http://localhost:3001",  "http://localhost:3002"]
 }));

const userSocketMap={};

io.on('connection',(socket)=>{

  
  // console.log(`Client  Connected ${socket}`);

  const username=socket.handshake.query.username;

  console.log("user connected name="+username);
  userSocketMap[username]=socket;


  socket.on('chat msg',(msg)=>{

    
    console.log("sender ="+msg.sender);
    console.log("receiever ="+msg.receiver);
    console.log("Receieved Mess age "+msg.text);

    // send message to itself also
    // io.emit('chat msg',msg);
    const receiverSocket=userSocketMap[msg.receiver];

    if(receiverSocket)
    {
      receiverSocket.emit('chat msg',msg);
    }

    addMsgToConversation([msg.sender,msg.receiver],{
      text:msg.text,
      sender:msg.sender,
      receiver:msg.receiver
    });

    // socket.broadcast.emit('chat msg',msg);


  });

});

app.use('/msgs',router);


// Define a route
app.get('/', (req, res) => {
  res.send('Congratulations Server Created :) !');
});

app.get('/DSA', (req, res) => {
  res.send('Prepare DSA for Product based companies !');
});

// Start the server
server.listen(port, () => {
  connectToMongoDB();
  console.log(`Server is listening at http://localhost:${port}`);
});