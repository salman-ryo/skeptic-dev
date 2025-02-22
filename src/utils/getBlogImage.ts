import { Block } from "@/lib/types/blog";

/**
 * Extracts the image URL and alt text from blog blocks.
 *
 * @param blocks - Array of blog blocks.
 * @param fallbackUrl - Fallback URL to use if no image is found.
 * @returns An object containing the image URL and alt text.
 */
export function getBlogImage(
    blocks: Block[] | undefined,
    fallbackUrl: string = "/images/blogs/skhero.jpg"
  ): { url: string; alt: string } {
    // Validate the blocks input
    if (!blocks || !Array.isArray(blocks)) {
      return { url: fallbackUrl, alt: "Blog image" };
    }
  
    // Find the first block of type 'image' with a valid URL
    const imageBlock = blocks.find(
      (block) =>
        block.type === "image" &&
        block.metadata &&
        typeof block.metadata.url === "string" &&
        block.metadata.url.trim().length > 0
    );
  
    if (imageBlock && imageBlock.metadata?.url) {
      const url = imageBlock.metadata.url;
      const alt = imageBlock.metadata.alt || "Blog image";
      return { url, alt };
    }
  
    // Fallback when no valid image block is found
    return { url: fallbackUrl, alt: "Blog image" };
  }