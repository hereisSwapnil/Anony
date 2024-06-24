import { signIn } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    return Response.json(
      {
        success: true,
        message: "Sign-in successful",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error during sign-in:", error);
    return Response.json(
      {
        success: false,
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}
