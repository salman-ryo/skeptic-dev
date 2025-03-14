// models/Blog.ts
import { Block, BlogDocument } from "@/lib/types/blog";
import { Schema, model, models } from "mongoose";
import slugify from "slugify";

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
    blocks: [BlockSchema],
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
