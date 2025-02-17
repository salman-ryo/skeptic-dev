// app/api/auth/signup/route.ts
import { connectToDatabase } from "@/lib/mongoose";
import OTP from "@/models/OTP";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();
  const { name, email, password } = await req.json();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { error: 'User already exists' }, 
      { status: 400 }
    );
  }

  // Check for verified OTP
  // const verifiedOtp = await OTP.findOne({ 
  //   email, 
  //   verified: true 
  // });

  // if (!verifiedOtp) {
  //   return NextResponse.json(
  //     { error: 'OTP not verified' },
  //     { status: 400 }
  //   );
  // }

  // Create new user
  const user = new User({ name, email, password });
  await user.save();

  // Delete the OTP record after successful signup
  // await OTP.deleteOne({ email });

  return NextResponse.json({ 
    message: 'User created successfully' 
  });
}