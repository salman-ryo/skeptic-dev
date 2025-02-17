// models/Otp.ts
import mongoose, { Document } from 'mongoose';
import { boolean } from 'zod';

export interface IOtp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
  expiresAt: Date;
  verified:boolean;
}

const otpSchema = new mongoose.Schema<IOtp>({
  email: { type: String, required: true, index: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  verified: { type:Boolean,default: false},
  expiresAt: { type: Date },
});

// Create TTL index for automatic expiration (5 minutes)
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Otp || mongoose.model<IOtp>('Otp', otpSchema);