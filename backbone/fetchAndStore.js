const fs = require('fs').promises;
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const sqlite3 = require('sqlite3').verbose();
const moment = require('moment');



// set up DB stuff 
// TODO: Find a better way to handle database interaction #1 
// TODO: Extract into env #2
let db = new sqlite3.Database('./backbone/db/daily_events.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
});

db.run("DELETE FROM todays_events", (err) => {
  if (err) { console.error(err.message); }
});


// All Google API code in this section are from Google Calendar API Node quickstart
// https://developers.google.com/calendar/api/quickstart/nodejs

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(__dirname, './creds/token.json');
const CREDENTIALS_PATH = path.join(__dirname, './creds/credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth) {
  const calendar = google.calendar({ version: 'v3', auth });
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: moment().format(),
    timeMax: moment().add(1, 'days').endOf('day').format(),
    singleEvents: true,
    orderBy: 'startTime',
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }

  events.map((event, i) => {
    // for each event loaded, only pull information required for the dashboard
    db.run(`INSERT INTO todays_events values(?, ?, ?)`, [moment(event.start.dateTime).unix(), moment(event.end.dateTime).unix(), event.summary],
      (err) => {
        if (err) { return console.error(err.message); }
      });
  });
}

authorize().then(listEvents).then(() => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
}).catch(console.error);

