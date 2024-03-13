const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

/* GET home page. */
router.get("/", (req, res) => {
  const show = !req.session.vote;
  Quiz.find({})
    .then((data) => {
      let sum = 0;
      data.forEach((item) => {
        sum += item.vote;
      });
      res.render("quiz", { title: "Quiz", data, show, sum });
    })
    .catch((error) => console.log(error));
});

router.post("/", (req, res) => {
  const body = req.body.quiz;
  Quiz.findOne({ _id: body })
    .then((data) => {
      data.vote += 1;
      data.save();
      req.session.vote = 1;
      res.redirect("/quiz");
    })
    .catch((error) => console.log(error));
});

module.exports = router;
