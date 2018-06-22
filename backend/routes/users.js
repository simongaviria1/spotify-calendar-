const express = require('express');
const router = express.Router();
const db = require('.././db/queries')
const {loginRequired} = require("../auth/helpers");
const passport = require("../auth/local");

router.post("/login", passport.authenticate("local"), (req, res) => {
  // console.log('this is what the DB returned', req.user);
  res
    .status(200)
    .json({user: req.user, message: `${req.user.username} is logged in`});
  return
});
router.get("/getLoggedinUser", loginRequired, db.getUser);

/* GET users listing. */
router.get('/events', db.getEvents);
router.post('/events', db.postEvents);
router.delete('/events', db.deleteEvent);

module.exports = router;
