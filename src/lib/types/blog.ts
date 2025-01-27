import { Document } from "mongoose";

// types/Blog.ts
export type BlockType = 
  | 'text' 
  | 'heading1' 
  | 'heading2' 
  | 'image' 
  | 'code' 
  | 'quote'
  | 'bulletList'
  | 'numberedList'
  | 'youtube'
  | 'twitter'
  | 'divider';

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  metadata?: {
    url?: string;
    alt?: string;
    language?: string;
    listItems?: string[];
    embedId?: string;
  };
}

export interface BlogDocument extends Document {
  title: string;
  author: string;
  description?:string;
  blocks?: Block[];
  tags?:string[];
  views?:number;
  createdAt: Date;
  updatedAt?: Date;
}