// models/Collection.ts
import { Document, model, models, Schema, Types } from "mongoose";
import { TSessionUser } from "@/lib/types/user";

interface DrafCollectionDocument extends Document {
  _id: string;
  user: Types.ObjectId | TSessionUser;
  blog: Types.ObjectId;               
  createdAt: Date;
}

const DraftCollectionSchema = new Schema<DrafCollectionDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index to prevent duplicate saves
DraftCollectionSchema.index({ user: 1, blog: 1 }, { unique: true });

export const DraftCollection = models.DraftCollection || model<DrafCollectionDocument>("DraftCollection", DraftCollectionSchema);
