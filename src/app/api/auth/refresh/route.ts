import { NextResponse } from 'next/server';
import { verifyToken, generateAccessToken, generateRefreshToken } from '@/lib/tokens';
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
  
    // Generate NEW tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = await generateRefreshToken(user);
  
    return NextResponse.json({ 
      accessToken: newAccessToken,
      refreshToken: newRefreshToken // Return new refresh token
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }
}