alias runsql="sqlite3 database/sqlite3 <"

clean () {
  rm -f database/sqlite3
  runsql create-database.sql
  touch server.js  # To force a restart to reconnect to new DB
}

getall () {
  runsql select-wake-times.sql
}
