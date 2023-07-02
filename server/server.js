import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const PORT = 8000;
const app = express();

app.use(cors);

await mongoose.connect(
  "mongodb+srv://sachinlakshan04:u81URhe9j5IExW4j@cluster0.bbojern.mongodb.net/?retryWrites=true&w=majority"
);
console.log("MongoDB connection is established");

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
