const express = require("express");
const router = express.Router();
const News = require("../models/news");

/* GET home page. */
router.get("/", (req, res) => {
  const search = req.query.search;

  const findNews = News.find({ title: new RegExp(search, "i") }).sort({
    created: -1,
  });
  findNews
    .exec()
    .then((data) => res.render("news", { title: "News", data, search }))
    .catch((error) => console.log(error));
});

module.exports = router;
