// Create express app
const express = require("express")
const dotenv = require('dotenv');
const redis = require('redis');
const path = require("path");
const { raw } = require("express");

// init express
const app = express()

// set up dotenv 
dotenv.config()


// init redis with default settings
const redisClient = redis.createClient({url: `${process.env.REDIS_URL}`});


// Start server
app.listen(process.env.REACT_APP_SERVER_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", process.env.REACT_APP_SERVER_PORT))
});


app.get("/getEvents", (req, res, next) => {
    (async () => {
        await redisClient.connect();
        const rawData = await redisClient.get('calendar');
        const eventsJson = JSON.parse(rawData);

        try {
            const eventsJson = JSON.parse(rawData);
            res.json({
                "data": eventsJson
            });
        } catch (error) {
            console.error("No data retrieved from Redis; run fetchAndStore.js first.  " + error);
        }

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
