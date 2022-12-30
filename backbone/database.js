var sqlite3 = require('sqlite3').verbose()

// set up DB stuff 
let db = new sqlite3.Database('./backbone/db/daily_events.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
});

module.exports = db