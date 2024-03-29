const express = require("express");
const router = express.Router();
const News = require("../models/news");
const defaultSort = -1;

/* GET home page. */
router.get("/", (req, res) => {
  const search = req.query.search || "";
  let sort = req.query.sort || defaultSort;

  if (sort !== -1 || sort !== 1) {
    sort = defaultSort;
  }

  const findNews = News.find({ title: new RegExp(search, "i") }).sort({
    created: sort,
  });
  findNews
    .exec()
    .then((data) => res.json(data))
    .catch((error) => console.log(error));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const findNews = News.findById(id);
  findNews
    .exec()
    .then((data) => res.json(data))
    .catch((error) => console.log(error));
});

module.exports = router;
