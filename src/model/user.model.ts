import mongoose, { Document, Schema } from "mongoose";
import { Message } from "./message.model";

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  verifyCode: string;
  verifyCodeExpiration: Date;
  verified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

const userSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
  },
  password: { type: String, required: [true, "Password is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/.+@.+\..+/, "Please use a valid email address"],
  },
  verifyCode: { type: String, required: true },
  verifyCodeExpiration: { type: Date, required: true },
  verified: { type: Boolean, default: false },
  isAcceptingMessages: { type: Boolean, default: false },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

const userModel =
  (mongoose.models?.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default userModel;
