import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  image?: string;
  role: 'user' | 'author' | 'admin';
  refreshToken?: string;
  createdAt: Date;
  comparePassword?(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String }, // Store Google profile picture
  role: { type: String, enum: ['user', 'author','admin'], default: 'user' },
  refreshToken: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Password hashing middleware (only when using credentials login)
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison method
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
