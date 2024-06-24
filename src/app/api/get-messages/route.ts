import { User } from "next-auth";
import { auth } from "../../../auth";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user.model";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  try {
    const session = await auth();
    const user: User | null = session?.user ?? null;
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "not authenticated",
        },
        {
          status: 404,
        }
      );
    }
    const userId = new mongoose.Types.ObjectId(user._id);
    const currentUser = await userModel
      .findOne({ _id: userId })
      .populate("messages");
    if (!currentUser) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 404,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "messages found",
        messages: currentUser.messages,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in getting messages", error);
    return Response.json(
      {
        success: false,
        message: "error in getting messages",
      },
      {
        status: 500,
      }
    );
  }
}
