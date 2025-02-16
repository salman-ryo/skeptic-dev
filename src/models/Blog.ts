// models/Blog.ts
import { Block, BlogDocument } from '@/lib/types/blog';
import { Schema, model, models } from 'mongoose';




const BlockSchema = new Schema<Block>({
  id: { type: String, required: true },
  type: { type: String, required: true },
  content: { type: String },
  metadata: {
    url: String,
    alt: String,
    language: String,
    listItems: [String],
    embedId: String,
  },
});


const BlogSchema = new Schema<BlogDocument>({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true, index:true },
  description: { type: String, maxlength:2000 },
  blocks: [BlockSchema],
  tags: [String],
  views: {type: Number, default:0}
}, {
  timestamps: true,
});

export const Blog = models.Blog || model<BlogDocument>('Blog', BlogSchema);
