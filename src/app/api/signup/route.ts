import { signIn } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import userModel from "@/model/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, username, password } = await request.json();
    const existingUserVerifiedByUsername = await userModel.findOne({
      username,
      verified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        {
          status: 400,
        }
      );
    }

    const existingUserByEmail = await userModel.findOne({
      email,
    });

    const verifyCode = crypto.randomInt(100000, 999999);
    if (existingUserByEmail) {
      if (existingUserByEmail.verified) {
        return Response.json(
          {
            success: false,
            message: "Email already exists",
          },
          {
            status: 400,
          }
        );
      } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        existingUserByEmail.password = hash;
        existingUserByEmail.username = username;
        existingUserByEmail.verifyCode = verifyCode.toString();
        existingUserByEmail.verifyCodeExpiration = new Date();
        existingUserByEmail.verifyCodeExpiration.setMinutes(
          existingUserByEmail.verifyCodeExpiration.getMinutes() + 10
        );
        await existingUserByEmail.save();
      }
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const verifyCodeExpiration = new Date();
      verifyCodeExpiration.setMinutes(verifyCodeExpiration.getMinutes() + 10);

      const newUser = await userModel.create({
        email,
        username,
        password: hash,
        verifyCode,
        verifyCodeExpiration,
      });

      await newUser.save();
    }

    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode.toString()
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        {
          status: 500,
        }
      );
    }

    await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    return Response.json(
      {
        success: true,
        message: "User created",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error signing up: ", error);
    return Response.json(
      {
        success: false,
        message: "Error signing up",
      },
      {
        status: 500,
      }
    );
  }
}
