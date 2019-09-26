const express = require("express");
var cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());

const events = require("./routes");

const PORT = process.env.PORT || 4241;
app.listen(PORT, () => {
    console.log("Connected to port:" + PORT);
});


app.use("/api/events", events);

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