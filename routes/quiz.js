const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

/* GET home page. */
router.get("/", (req, res) => {
  Quiz.find({})
    .then((data) => res.render("quiz", { title: "Quiz", data }))
    .catch((error) => console.log(error));
});

module.exports = router;
