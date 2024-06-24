import dbConnect from "@/lib/dbConnect";
import messageModel from "@/model/message.model";
import userModel from "@/model/user.model";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, message } = await request.json();
    if (!username || !message) {
      return Response.json(
        {
          success: false,
          message: "username and message are required",
        },
        {
          status: 400,
        }
      );
    }
    const user = await userModel.findOne({ username });
    if (!user) {
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
    const newMessage = await messageModel.create({ message });
    user.messages.push(newMessage);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "message sent",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in sending messages", error);
    return Response.json(
      {
        success: false,
        message: "error in sending messages",
      },
      {
        status: 500,
      }
    );
  }
}
