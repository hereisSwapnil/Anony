import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user.model";
import { usernameSchema } from "@/schema/signUpSchema";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const validation = usernameSchema.safeParse({ username });
  if (!username) {
    return Response.json(
      {
        success: false,
        message: "username parameter is required",
      },
      {
        status: 400,
      }
    );
  }
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
  const existingUser = await userModel.findOne({ username, verified: true });
  if (existingUser) {
    return Response.json(
      {
        success: false,
        message: "username is already taken",
      },
      {
        status: 400,
      }
    );
  }
  return Response.json({
    success: true,
    message: "username is available",
  });
}
