import { sendOtpEmail } from "@/actions/sendOTPEmail";
// import { sendOtpEmailMailgun } from "@/actions/sendOTPMailgun";
import { connectToDatabase } from "@/lib/mongoose";
import OTP from "@/models/OTP";
import User from "@/models/User";
import { NextResponse } from "next/server";

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const EXPIRES_IN = 5; // Minutes to expire

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email } = await req.json();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ error: "User exists" }, { status: 400 });
    }

    // Delete any existing OTP for this email
    await OTP.deleteOne({ email });

    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + EXPIRES_IN * 60 * 1000);

    // Save OTP to DB
    const newOtp = new OTP({
      email,
      otp,
      expiresAt,
    });
    await newOtp.save();

    // Send OTP via email
    // const emailResponse = await sendOtpEmailMailgun(email, otp);
    // console.log("🚀 ~ POST ~ emailResponse:", emailResponse)
    // if (emailResponse.error) {
    //   return NextResponse.json({ error: emailResponse.error }, { status: 500 });
    // }

    return NextResponse.json({
      message: "OTP generated and sent successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
