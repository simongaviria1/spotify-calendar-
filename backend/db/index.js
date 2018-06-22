var pgp = require('pg-promise')({});
var connectionString = 'postgress://localhost/database'
var db = pgp(connectionString)

module.exports = db;