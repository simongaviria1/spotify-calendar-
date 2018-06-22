var express = require('express');
var router = express.Router();
const db = require('../db/queries')

/* GET users listing. */
router.get('/events', db.getEvents);
router.post('/events', db.postEvent);
router.delete('/events', db.deleteEvent);

module.exports = router;
