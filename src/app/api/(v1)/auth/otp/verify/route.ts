// app/api/otp/verify/route.ts
import { connectToDatabase } from "@/lib/mongoose";
import OTP from "@/models/OTP";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();
  const { email, otp } = await req.json();

  const otpRecord = await OTP.findOne({ email });

  if (!otpRecord) {
    return NextResponse.json(
      { error: 'No OTP found for this email' },
      { status: 400 }
    );
  }

  if (otpRecord.expiresAt < new Date()) {
    await OTP.deleteOne({ email });
    return NextResponse.json(
      { error: 'OTP has expired' },
      { status: 400 }
    );
  }

  if (otpRecord.attemptsLeft <= 0) {
    await OTP.deleteOne({ email });
    return NextResponse.json(
      { error: 'Maximum attempts exceeded' },
      { status: 400 }
    );
  }

  if (otp !== otpRecord.otp) {
    otpRecord.attemptsLeft -= 1;
    await otpRecord.save();
    
    return NextResponse.json(
      { 
        error: 'Invalid OTP',
        attemptsLeft: otpRecord.attemptsLeft
      },
      { status: 400 }
    );
  }

  // Mark OTP as verified
  otpRecord.verified = true;
  await otpRecord.save();

  return NextResponse.json({ 
    message: 'OTP verified successfully' 
  },{status:200});
}