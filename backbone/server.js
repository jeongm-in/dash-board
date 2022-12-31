// Create express app
const express = require("express")
const app = express()
const dotenv = require('dotenv');
const WebSocket = require('ws');
const redis = require('redis');
const path = require("path");


// set up dotenv 
dotenv.config()

// set up redis client and subscribe 
console.log("message from server");
const redisClient = redis.createClient(process.env.REACT_APP_REDIS);
redisClient.subscribe('weather');
redisClient.subscribe('calendar');

console.log(redisClient);

const sock = new WebSocket.Server({port: process.env.REACT_APP_SOCKET_PORT});

sock.on('connection', (websocket) => {
    console.log('websocket created');
    redisClient.publish("weather", "SMORES", ()=>{
        process.exit();
    })
    // forward the message from redis on websocket
    redisClient.on('message', (_, message) => {
        console.log(message);
        websocket.send(message);
    })
})

// Server port
var HTTP_PORT = process.env.REACT_APP_SERVER_PORT;

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

// TODO: Extract into env #2
app.get("/getEvents", (req, res, next) => {

    
});

const buildPath = process.env.REACT_APP_BUILD_PATH;
app.use(express.static(buildPath));


const rootRouter = express.Router();
rootRouter.get('(/*)?', async (req, res, next) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.use(rootRouter);