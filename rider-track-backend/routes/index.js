var express = require('express');
var router = express.Router();


router.get("/", async (req, res) => {
    res.send("Inside GET API for list of events");
});

module.exports = router;