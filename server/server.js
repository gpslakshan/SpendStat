import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

await mongoose.connect(
  "mongodb+srv://sachinlakshan04:u81URhe9j5IExW4j@cluster0.bbojern.mongodb.net/?retryWrites=true&w=majority"
);
console.log("MongoDB connection is established");

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/transactions", (req, res) => {
  console.log(req.body);
  res.json({ message: "success" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
