const { Router } = require("express");
const bcrypt = require("bcrypt");
const router = new Router();
const { user: User } = require("../models");
const authMiddleware = require("../auth/middleware");

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
    const newUser = await User.create({
      fullName,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    res.json(newUser);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
