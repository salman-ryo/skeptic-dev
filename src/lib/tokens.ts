import jwt from 'jsonwebtoken';
import User from '@/models/User';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;
const ACCESS_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = '7d';

export const generateAccessToken = (user: any) => {
  return jwt.sign(
    { id: user.id, role: user.role }, // Use "id" consistently
    JWT_SECRET,
    { expiresIn: ACCESS_EXPIRES_IN }
  );
};

export const generateRefreshToken = async (user: any) => {
  const refreshToken = jwt.sign(
    { id: user.id },
    JWT_SECRET,
    { expiresIn: REFRESH_EXPIRES_IN }
  );
  
  await User.findByIdAndUpdate(user.id, { refreshToken });
  return refreshToken;
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};