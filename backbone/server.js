// Create express app
const express = require("express")
const app = express()
const dotenv = require('dotenv');
// const WebSocket = require('ws');
const redis = require('redis');
const path = require("path");

// init redis with default settings
const redisClient = redis.createClient();


// set up dotenv 
dotenv.config()


// Start server
app.listen(process.env.REACT_APP_SERVER_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", process.env.REACT_APP_SERVER_PORT))
});


app.get("/getEvents", (req, res, next) => {
    (async () => {
        await redisClient.connect();
        const data = await redisClient.json.get('calendar', { path: "." });
        res.json({
            "data": data
        });
    })().then(async () => {
        await redisClient.quit();
    })
});

const buildPath = process.env.REACT_APP_BUILD_PATH;
app.use(express.static(buildPath));


const rootRouter = express.Router();
rootRouter.get('(/*)?', async (req, res, next) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.use(rootRouter);