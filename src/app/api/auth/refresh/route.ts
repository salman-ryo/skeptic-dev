import { NextResponse } from 'next/server';
import { verifyToken, generateAccessToken } from '@/lib/tokens';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/mongoose';

export async function POST(req: Request) {
  await connectToDatabase();
  const { refreshToken } = await req.json();

  if (!refreshToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(refreshToken) as { userId: string };
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 403 });
    }

    const newAccessToken = generateAccessToken(user);
    return NextResponse.json({ accessToken: newAccessToken });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }
}