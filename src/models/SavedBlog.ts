import mongoose, { Document } from 'mongoose';

export interface ISavedBlog extends Document {
  user: mongoose.Types.ObjectId;
  blog: mongoose.Types.ObjectId;
  createdAt: Date;
}

const savedBlogSchema = new mongoose.Schema<ISavedBlog>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,index:true },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.SavedBlog ||
  mongoose.model<ISavedBlog>('SavedBlog', savedBlogSchema);
