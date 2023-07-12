import mongoose from "mongoose";
import "dotenv/config";

async function connect() {
  await mongoose.connect(process.env.DB_URL);
  console.log("MongoDB connection is established");
}

export default connect;
