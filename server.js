const sqlite3 = require('sqlite3').verbose();
const express = require('express');

const DB_PATH = './database/sqlite3';

const db = new sqlite3.Database(DB_PATH, startApp);

async function startApp() {
  const app = express();
  const PORT = process.env.PORT || 4001;

  app.use(express.static('public'));

  /**
   * Get all wake times e.g.
   *
   * [
   *   { date: "2020-01-01", "09:00" },
   *   { date: "2020-01-02", "13:00" }
   * ]
   */
  app.get('/api/wake_times', async (req, res) => {
    await fakeNetworkDelay();
    db.all('SELECT date, time FROM wake_times;', (err, rows) => {
      res.send(rows);
      // TODO error handling
    });
  });

  /**
   * Adds or updates today's wake_times entry to the current time
   */
  app.put('/api/wake_times/now', async (req, res) => {
    await fakeNetworkDelay();
    const date = getDate();
    const time = getTime();
    // Don't do interpolation like this with user-provided data!
    const command = `
      INSERT INTO wake_times (date, time)
      VALUES ("${date}", "${time}")
      ON CONFLICT (date)
      DO UPDATE SET time=excluded.time;
    `;
    db.run(command, (err) => {
      res.send("done");
      // TODO error handling
    });
  });

  app.listen(PORT, () => console.log('Example app listening at http://localhost:'+PORT))
}

function getDate() {
  const today = new Date();
  const year = (today.getFullYear())
    .toString();
  const month = (today.getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const day = (today.getDate())
    .toString()
    .padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTime() {
  const now = new Date();
  const hours = (now.getHours() + 1)
    .toString()
    .padStart(2, '0');
  const minutes = (now.getMinutes())
    .toString()
    .padStart(2, '0');
  return `${hours}:${minutes}`;
}

function fakeNetworkDelay() {
  return wait(500);
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
