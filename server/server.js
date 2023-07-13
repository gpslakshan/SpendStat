import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connect from "./database/mongodb.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import "dotenv/config";
import routes from "./routes/index.js";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

await connect();

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
