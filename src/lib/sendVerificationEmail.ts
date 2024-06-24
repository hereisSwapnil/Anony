import { ApiResponse } from "@/types/ApiResponse";
import { Resend } from "resend";
import verificationEmail from "@/emailTemplates/verificationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Anony | Verification Code",
      react: verificationEmail({ verificationCode: verifyCode }),
    });
    return {
      success: true,
      message: "Verification email sent",
    };
  } catch (error) {
    console.error("Error sending verification email: ", error);
    return {
      success: false,
      message: "Error sending verification email",
    };
  }
};
