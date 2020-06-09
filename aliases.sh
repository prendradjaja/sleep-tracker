alias runsql="sqlite3 database/sqlite3 <"

clean () {
  rm -f database/sqlite3
  runsql create-database.sql
}

getall () {
  runsql select-wake-times.sql
}
