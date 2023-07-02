import mongoose from "mongoose";

async function connect() {
  await mongoose.connect(
    "mongodb+srv://sachinlakshan04:u81URhe9j5IExW4j@cluster0.bbojern.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("MongoDB connection is established");
}

export default connect;
