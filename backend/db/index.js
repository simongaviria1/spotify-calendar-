var pgp = require('pg-promise')({});
var connectionString = 'postgress://localhost/calendar_events'
var db = pgp(connectionString)

module.exports = db;