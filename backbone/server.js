// Create express app
const express = require("express")
const dotenv = require('dotenv');
const redis = require('redis');
const path = require("path");

// init express
const app = express()

// set up dotenv
dotenv.config()

// init redis with default settings
console.log(process.env.REDIS_URL)
const redisClient = redis.createClient({url: `${process.env.REDIS_URL}`});


// Start server
app.listen(process.env.REACT_APP_SERVER_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", process.env.REACT_APP_SERVER_PORT))
});


app.get("/getEvents", (req, res, next) => {
    (async () => {
        await redisClient.connect();
        const rawData = await redisClient.get('calendar');
        
        res.json({
            "data": JSON.parse(rawData)
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
