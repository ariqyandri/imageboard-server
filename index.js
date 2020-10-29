const express = require("express");
const app = express();
const PORT = 4000;
const imageRouter = require("./Routers/image");
const userRouter = require("./Routers/user");

app.use(express.json());

app.use("/images", imageRouter);

app.use("/users", userRouter);

app.listen(PORT, () => console.log("LISTENING ON:", PORT));
