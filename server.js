const sqlite3 = require('sqlite3').verbose();
const express = require('express');

const DB_PATH = './database/sqlite3';

const db = new sqlite3.Database(DB_PATH, startApp);

function startApp() {
  const app = express();
  const PORT = process.env.PORT || 4001;

  app.use(express.static('public'));

  app.get('/api/wake_times', (req, res) => {
    db.all('SELECT date, time FROM wake_times;', (err, rows) => {
      res.send(rows);
    });
  });

  app.listen(PORT, () => console.log('Example app listening at http://localhost:'+PORT))
}
