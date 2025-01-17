// components/BlockRenderer.tsx
import { Block } from "@/lib/types/blog";
import { CodeBlock } from './CodeBlock';

export const BlockRenderer = ({ block }: { block: Block }) => {
  const renderHTML = (content: string) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  switch (block.type) {
    case 'heading1':
      return <h1 className="text-4xl font-bold mb-4">{renderHTML(block.content)}</h1>;
    
    case 'heading2':
      return <h2 className="text-3xl font-semibold mb-3">{renderHTML(block.content)}</h2>;
    
    case 'image':
      return (
        <figure className="my-6">
          <img
            src={block.metadata?.url}
            alt={block.metadata?.alt || ''}
            className="w-full rounded-lg"
          />
          {block.metadata?.alt && (
            <figcaption className="text-center text-gray-600 mt-2">
              {block.metadata.alt}
            </figcaption>
          )}
        </figure>
      );
    
    case 'code':
      return (
        <div className="my-4">
          <CodeBlock 
            content={block.content} 
            language={block.metadata?.language || 'javascript'} 
          />
        </div>
      );
    
    case 'quote':
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 my-6 italic">
          {renderHTML(block.content)}
        </blockquote>
      );
    
    case 'youtube':
      return (
        <div className="my-6 aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${block.metadata?.embedId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </div>
      );
    
    case 'divider':
      return <hr className="my-8 border-gray-200" />;
    
    default:
      return <div className="mb-4 prose">{renderHTML(block.content)}</div>;
  }
};