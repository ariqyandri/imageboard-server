const { Router } = require("express");
const { image: Image } = require("../models");
const { toJWT, toData } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");

const router = new Router();

// router.get("/", (req, res, next) => {
//   try {
//     res.send(`Hello world, this is image`);
//   } catch (e) {
//     next(e);
//   }
// });

router.get("/", authMiddleware, (req, res, next) => {
  try {
    res.send(`Hello world, this is image`);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Image.findByPk(id);
    const image = await result.dataValues;
    res.send(
      `<img src=${image.url} alt=${image.title} style="max-width:1000px">`
    );
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      res.status(400).send(`parameters are missing`);
    }
    const newImage = await Image.create({ title, url });
    res.json(newImage);
  } catch (e) {
    next(e);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { id } = req.body;
    const image = await Image.findByPk(parseInt(id));
    if (!image) {
      res.status(400).send(`image not found`);
    }
    await image.destroy();
    res.json(image);
  } catch (e) {
    next(e);
  }
});

router.get("/auth/messy", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      console.log(data);
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
    const allImages = await Image.findAll();
    res.json(allImages);
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
});

module.exports = router;
