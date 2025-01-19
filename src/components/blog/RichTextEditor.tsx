"use client"
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@/components/ui/button';
import { Bold, Italic, List, ListOrdered, Code } from 'lucide-react';

export const RichTextEditor = ({ 
  content, 
  onChange 
}: { 
  content: string;
  onChange: (content: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender:false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

  });

  if (!editor) return null;

  return (
    <div className="border rounded-md">
      <div className="border-b p-2 flex gap-2">
        <Button
          size="sm"
          variant={editor.isActive('bold') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive('italic') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive('bulletList') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive('orderedList') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        {/* <Button
          size="sm"
          variant={editor.isActive('code') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code className="h-4 w-4" />
        </Button> */}
      </div>
      <EditorContent editor={editor} className="p-4" />
    </div>
  );
};