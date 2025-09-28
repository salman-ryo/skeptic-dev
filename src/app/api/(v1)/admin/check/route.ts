import {  NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/mongoose';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const user = await User.findById(token.userId);

  return NextResponse.json({ isAdmin: user?.role === 'admin' });
}