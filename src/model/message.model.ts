import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
  message: string;
}

const messageSchema: Schema<Message> = new Schema(
  {
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const messageModel =
  (mongoose.models?.Message as mongoose.Model<Message>) ||
  mongoose.model<Message>("Message", messageSchema);

export default messageModel;
