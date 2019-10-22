/**
 * Author: Janani Thiagarjan
 * Modified by: Shilpa Bhat
 * Task: Backend project setup
 * Task no: 35
 * Date: 09/17/2019
 * Modified by: Sai Saran Kandimalla
 * Date: 10/02/2019
 * Task no: 59
 */
const express = require("express");
var cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 4241;

const eventsRoute = require("./routes/events");
const userRoute = require("./routes/user");
const authenticationRoute = require("./routes/authentication");
const userEventsRoute = require("./routes/user_events");

// middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

app.use(cors());

app.listen(PORT, () => {
    console.log("Connected to port:" + PORT);
});

app.use("/api/events", eventsRoute);
app.use("/api/user", userRoute);
app.use("/api/authentication", authenticationRoute);
app.use("/api/user_events", userEventsRoute);

mongoose.connect('mongodb+srv://root-user:admin@softwarefactory-erwi0.mongodb.net/test?retryWrites=true&w=majority', {
        dbName: 'tracker',
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`Succesfully Connected to the Mongodb Database`);
    })
    .catch(() => {
        console.log(`Error Connecting to the Mongodb Database`);
    });

module.exports = app; // for testing
