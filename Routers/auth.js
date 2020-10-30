const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const { user: User } = require("../models");
const authMiddleware = require("../auth/middleware");
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      message: "Please supply a valid email and password",
    });
  }
  const user = await User.findOne({ where: { email: email } });
  if (bcrypt.compareSync(password, user.password)) {
    res.send({
      jwt: toJWT({ userId: user.id }),
    });
  } else {
    res.status(404).send({ message: "Password incorrect" });
  }
});

router.get("/test-auth", authMiddleware, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  });
});

module.exports = router;
