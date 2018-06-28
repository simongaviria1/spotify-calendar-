const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

// Creates new user
const createUser = (req, res, next) => {
    const hash = authHelpers.createHash(req.body.password);
    console.log("create user hash:", hash);
    db
        .any(`INSERT INTO users (username, password_digest, email, fullName) 
        VALUES ($1, $2, $3, $4) RETURNING users.username, users.email, users.fullName`, [req.body.username, hash, req.body.email, req.body.fullName])
        .then((data) => {
            res
                .status(200)
                .json({data: data[0]})
        })
        .catch(err => {
            console.log(err);
            res
                .status(500)
                .json({message: `failed${err}`})
        })
}

//Logs out user
const logoutUser = (req, res, next) => {
    req.logout();
    res
        .status(200)
        .send("log out success");
};

//Grabs user information
const getUser = (req, res, next) => {
    db
        .one("SELECT * FROM users WHERE username=${username}", req.user)
        .then(data => {
            res
                .status(200)
                .json({user: data});
        })
        .catch(err => {
            return next(err);
        })
};

//Grabs all of the notes in the database by month
const getEvents = (req, res, next) => {
    db
        .any("SELECT id, description, start_time, end_time, event_day FROM events WHERE user_i" +
            "d = ${user_id} AND event_month = ${event_month}", {
        user_id: req.query.user_id,
        event_month: req.query.event_month
    })
        .then(data => {
            res
                .status(200)
                .json({user: data});
        })
        .catch(err => {
            return next(err);
        })
};

//Adds another note to the backend
const postEvents = (req, res, next) => {
    db
        .none("INSERT INTO events (description, start_time, end_time, event_month, event_day, e" +
            "vent_year, user_id) VALUES (${description}, ${start_time}, ${end_time}, ${event_" +
            "month},${event_day},${event_year}, ${user_id})", {
        description: req.body.description,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        event_month: req.body.event_month,
        event_day: req.body.event_day,
        event_year: req.body.event_year,
        user_id: req.body.user_id
    })
        .then((data) => {
            res.status(200)
        })
        .catch(err => {
            return next(err)
        })
};

const deleteEvent = (req, res, next) => {
    db
        .none("DELETE FROM events WHERE description = ${description}", {description: req.body.description})
        .then((data) => {
            res.status(200)
        })
        .catch(err => {
            return next(err)
        })
};

module.exports = {
    createUser,
    getUser,
    logoutUser,
    getEvents,
    postEvents,
    deleteEvent
};
