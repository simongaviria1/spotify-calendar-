var pgp = require('pg-promise')({});
var connectionString = "postgres://localhost/calendar_events"
var db = pgp(connectionString)

module.exports = db;