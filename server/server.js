import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionsRouter from "./routes/transactions.js";
import AuthRouter from "./routes/auth.js";
import connect from "./database/mongodb.js";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

await connect();

app.use("/transactions", TransactionsRouter);
app.use("/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
