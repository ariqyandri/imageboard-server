const { Router } = require("express");
const { user: User } = require("../models");
const router = new Router();

router.get("/", (req, res, next) => {
  try {
    res.send(`Hello world, this is user`);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      res.status(400).send(`parameters are missing`);
    }
    const newUser = await User.create({ fullName, email, password });
    res.json(newUser);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
