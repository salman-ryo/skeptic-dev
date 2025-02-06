import { NextResponse } from 'next/server';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { connectToDatabase } from '@/lib/mongoose';

export async function POST(req: Request) {
  await connectToDatabase();
  const { email, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();

  return NextResponse.json({ message: 'User created successfully' });
}