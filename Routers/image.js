const { Router } = require("express");
const router = new Router();

router.get("/", (req, res, next) => {
  try {
    res.send(`Hello world, this is image`);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
