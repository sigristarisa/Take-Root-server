const express = require("express");
const cors = require("cors");
import userRouter from "./routes/user.js";
import raisedBedRouter from "./routes/raisedBed.js";
import squareRouter from "./routes/square.js";
import plantRouter from "./routes/plant.js";

const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));
app.use(express.static("plant-image"));
app.use(express.static("plant-image"));
app.use(express.static("default-user-image"));

app.use("/assets", express.static("assets"));
app.use("/user", userRouter);
app.use("/raisedbed", raisedBedRouter);
app.use("/square", squareRouter);
app.use("/plant", plantRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`\n Server is running on http://localhost:${port}\n`);
});
