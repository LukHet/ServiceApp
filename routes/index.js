const express = require("express");
const router = express.Router();
const login = "login";
const password = "password";

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Logowanie" });
});

router.post("/login", (req, res) => {
  if (req.body.login === login && req.body.password === password) {
    req.session.admin = 1;
    res.redirect("/admin");
    return;
  }
  res.redirect("/login");
});

module.exports = router;
