import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

// signup API
export async function POST(req: Request) {
  await connectToDatabase();
  const { name, email, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Pass the plain text password; the pre-save hook will hash it.
  const user = new User({ name, email, password });
  await user.save();

  return NextResponse.json({ message: 'User created successfully' });
}
