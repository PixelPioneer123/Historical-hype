import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/historical-hype";
  await mongoose.connect(uri);
  console.log("Connected to MongoDB:", uri);
}
