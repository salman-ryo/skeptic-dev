import { TSessionUser } from "@/lib/types/user";
import { Document, model, models, Schema } from "mongoose";
import slugify from "slugify";

interface BlogDocument extends Document{
    _id: string;
      title: string;
      slug: string;
      author: TSessionUser;
      description?: string;
      content?: string;
      tags?: string[];
      views: number;
      createdAt: Date;
      updatedAt?: Date;
}
const BlogSchema = new Schema<BlogDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, maxlength: 2000 },
    content: {type: String, maxlength:100000},
    tags: { type: [String], index: true },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate slug from title
BlogSchema.pre("save", function (next) {
  if (!this.slug || this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
}); 

export const Blog = models.Blog || model<BlogDocument>("Blog", BlogSchema);