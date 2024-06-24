import dbConnect from "@/lib/dbConnect";
import { auth } from "../../../auth";
import { User } from "next-auth";
import userModel from "@/model/user.model";

export async function POST(request: Request) {
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
    const currentUser = await userModel.findOne({ _id: user._id });
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
    currentUser.isAcceptingMessages = !currentUser.isAcceptingMessages;
    await currentUser.save();
    return Response.json(
      {
        success: true,
        message: "message accepting status updated",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in updating message accepting status", error);
    return Response.json(
      {
        success: false,
        message: "error in updating message accepting status",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  dbConnect();
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
    const currentUser = await userModel.findOne({ _id: user._id });
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
        isAcceptingMessages: currentUser.isAcceptingMessages,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in getting message accepting status", error);
    return Response.json(
      {
        success: false,
        message: "error in getting message accepting status",
      },
      {
        status: 500,
      }
    );
  }
}
