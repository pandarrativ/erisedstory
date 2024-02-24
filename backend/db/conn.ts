import mongoose from "mongoose";

const connectDb = (uri: string) => {
  return mongoose.connect(uri);
}

export default connectDb;