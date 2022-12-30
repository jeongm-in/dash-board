// Create express app
const cors = require('cors');
const express = require("express")
const app = express()
const dotenv = require('dotenv')

// set up dotenv 
dotenv.config()


// TODO: is CORS necessary? #3 
app.use(cors({origin:true,credentials: true}));

// TODO: Extract into env #2
const db = require("./database.js")
const path = require("path");
// Server port
var HTTP_PORT = 8000


// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

// TODO: Extract into env #2
app.get("/getEvents", (req, res, next) => {

    db.all("SELECT * FROM todays_events ORDER BY eventStartTimestamp", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": rows
        });
    });
});

const buildPath = process.env.REACT_APP_BUILD_PATH;
app.use(express.static(buildPath));


const rootRouter = express.Router();
rootRouter.get('(/*)?', async (req, res, next) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.use(rootRouter);