"use client"
import { Block } from "@/lib/types/blog";
import dynamic from "next/dynamic";
import Image from "next/image";

const DynamicCodeBlock = dynamic(
  () => import('./CodeBlock').then(mod => mod.CodeBlock), 
  { ssr: false }
);

export const BlockRenderer = ({ block }: { block: Block }) => {
  const renderHTML = (content: string) => {
    return <div className="light:text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: content }} />;
  };

  switch (block.type) {
    case 'heading1':
      return <h1 className="text-4xl font-bold mb-4">{renderHTML(block.content)}</h1>;
    
    case 'heading2':
      return <h2 className="text-3xl font-semibold mb-3 dark:text-gray-300
      max-md:text-2xl
      ">{renderHTML(block.content)}</h2>;
    
    case 'image':
      return (
        <figure className="my-6">
          <Image
            width={1920}
            height={1080}
            src={block.metadata?.url || "/images/blogs/codeblack.jpg"}
            alt={block.metadata?.alt || ''}
            className="w-full max-h-[500px] object-cover rounded-lg border
            dark:border-gray-900
            max-sm:h-[260px] max-md:h-[300px]
            "
          />
          {block.metadata?.alt && (
            <figcaption className="text-center text-gray-600 mt-2 dark:text-gray-400">
              {block.metadata.alt}
            </figcaption>
          )}
        </figure>
      );
    
      case 'code':
        return (
          <div className="my-4">
            <DynamicCodeBlock 
              content={block.content} 
              language={block.metadata?.language?.toLowerCase() || 'javascript'} // Ensure lowercase
            />
          </div>
        );
    
    case 'quote':
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 my-6 italic
        max-md:text-sm
        dark:border-blue-400 dark:text-cPeach
        ">
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
      return <hr className="my-8 border-gray-200 dark:border-gray-700" />;
    
    default: //text
      return <div className="mb-4 dark:text-gray-300">{renderHTML(block.content)}</div>;
  }
};