CREATE TABLE wake_times (
  date TEXT PRIMARY KEY,
  time TEXT
);

INSERT INTO wake_times
  ( date, time )
VALUES
  ( "2020-06-01", "09:00" ),
  ( "2020-06-02", "09:10" ),
  ( "2020-06-03", "09:20" ),
  ( "2020-06-04", "09:30" ),
  ( "2020-06-05", "09:40" )
;
