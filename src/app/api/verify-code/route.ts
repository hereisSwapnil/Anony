import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user.model";
import { verifyCodeSchema } from "@/schema/verifyCodeSchema";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, verifyCode } = await request.json();
    if (!username || !verifyCode) {
      return Response.json(
        {
          success: false,
          message: "username and verifyCode are required",
        },
        {
          status: 400,
        }
      );
    }
    const validation = verifyCodeSchema.safeParse({ username, verifyCode });
    if (!validation.success) {
      return Response.json(
        {
          success: false,
          message: validation.error.errors[0].message,
        },
        {
          status: 400,
        }
      );
    }
    const user = await userModel.findOne({
      username,
    });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    if (user.verifyCode !== verifyCode) {
      return Response.json(
        {
          success: false,
          message: "Invalid verification code",
        },
        {
          status: 400,
        }
      );
    }
    const now = new Date();
    if (now > user.verifyCodeExpiration) {
      return Response.json(
        {
          success: false,
          message: "Verification code expired",
        },
        {
          status: 400,
        }
      );
    }
    user.verified = true;
    await user.save();
    return Response.json(
      {
        success: true,
        message: "User verified",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in verifying user: ", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying user",
      },
      {
        status: 500,
      }
    );
  }
}
