import "dotenv/config";
import express from "express";
import cors from "cors";
import raisedBedRouter from "./routes/raisedBed";

const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/raisedbed", raisedBedRouter);

app.get("*", (req, res) => {
  res.json({ ok: true });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`\n Server is running on http://localhost:${port}\n`);
});
