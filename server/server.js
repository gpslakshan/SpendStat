import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionsRouter from "./routes/transactions.js";
import AuthRouter from "./routes/auth.js";
import UserRouter from "./routes/user.js";
import connect from "./database/mongodb.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import "dotenv/config";

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

app.use("/transactions", TransactionsRouter);
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
