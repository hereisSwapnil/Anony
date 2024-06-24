import mongoose from "mongoose";

type connectionObject = {
  isConnected?: boolean;
};

const connection: connectionObject = {};

const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Database is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    connection.isConnected = true;
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
};

export default dbConnect;
