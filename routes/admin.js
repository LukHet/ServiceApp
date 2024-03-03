const express = require("express");
const News = require("../models/news");
const router = express.Router();

router.all("*", (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("login");
    return;
  }

  next();
});

const getItemsFromDB = async () => {
  const itemsNews = await News.find({});
  return itemsNews;
};

/* GET home page. */
router.get("/", (req, res) => {
  console.log("home");
  getItemsFromDB()
    .then((data) => {
      console.log(data);
      res.render("admin/index", { title: "Admin", data });
    })
    .catch((err) => console.log(err));
});

router.get("/news/add", (req, res) => {
  res.render("admin/news-form", { title: "Dodaj news", errors: {}, body: {} });
});

router.post("/news/add", (req, res) => {
  const body = req.body;
  const newsData = new News(body);
  const errors = newsData.validateSync();
  newsData
    .save()
    .then((data) => {
      console.log(data);
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
      res.render("admin/news-form", { title: "Dodaj news", errors, body });
    });
});

router.get("/news/delete/:id", (req, res) => {
  News.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/admin"))
    .catch((err) => console.log(err));
});

module.exports = router;
