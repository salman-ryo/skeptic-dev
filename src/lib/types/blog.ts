// types/Blog.ts
type BlockType = 
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

interface Block {
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