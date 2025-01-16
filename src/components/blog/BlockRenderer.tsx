
const BlockRenderer = ({ block }: { block: Block }) => {
    switch (block.type) {
      case 'heading1':
        return <h1 className="text-4xl font-bold mb-4">{block.content}</h1>;
      case 'heading2':
        return <h2 className="text-3xl font-semibold mb-3">{block.content}</h2>;
      case 'image':
        return (
          <img
            src={block.metadata?.url}
            alt={block.metadata?.alt}
            className="w-full rounded-lg my-4"
          />
        );
      case 'code':
        return (
          <pre className="bg-gray-100 p-4 rounded-lg my-4">
            <code>{block.content}</code>
          </pre>
        );
      case 'quote':
        return (
          <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">
            {block.content}
          </blockquote>
        );
      default:
        return <p className="mb-4">{block.content}</p>;
    }
  };

  export default BlockRenderer;