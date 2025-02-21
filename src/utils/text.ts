import { Block } from "@/lib/types/blog";

/**
 * Estimates the reading time for a given text.
 * @param text - The text to estimate reading time for.
 * @param wordsPerMinute - Average reading speed in words per minute (default: 200).
 * @returns A string representing the estimated reading time (e.g., "8min", "50min", "1h 20min").
 */
export function estimateReadTime(text: string, wordsPerMinute: number = 200): string {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
  
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}min`;
    } else {
      return `${minutes}min`;
    }
  }

  export function calculateReadTime(blocks: Block[], wordsPerMinute: number = 200): number {
    if(!blocks) return 0;
    let totalWords = 0;
    let additionalTime = 0; // Additional time in seconds for non-text blocks
  
    blocks.forEach((block) => {
      switch (block.type) {
        case 'text':
        case 'heading1':
        case 'heading2':
        case 'quote':
          // Count words in textual content
          const wordCount = block.content.split(/\s+/).length;
          totalWords += wordCount;
          break;
  
        case 'bulletList':
        case 'numberedList':
          // Count words in list items
          if (block.metadata?.listItems) {
            const listWords = block.metadata.listItems.reduce((sum, item) => sum + item.split(/\s+/).length, 0);
            totalWords += listWords;
          }
          break;
  
        case 'image':
        case 'youtube':
        case 'twitter':
          // Assign fixed time for visual or embedded content
          additionalTime += 10; // 10 seconds per visual block
          break;
  
        case 'code':
          // Assign more time for code blocks
          additionalTime += 15; // 15 seconds per code block
          break;
  
        case 'divider':
          // Divider adds minimal time
          additionalTime += 2; // 2 seconds for dividers
          break;
  
        default:
          break;
      }
    });
  
    // Calculate read time for text blocks
    const textReadingTime = totalWords / wordsPerMinute * 60; // Convert minutes to seconds
  
    // Total time in minutes (rounded up to nearest whole number)
    return Math.ceil((textReadingTime + additionalTime) / 60);
  }
  

  export function limitWords(input: string, wordLimit: number): string {
    const words = input.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return input;
  }

  export function limitChars(input: string, charLimit: number): string {
    if (input.length > charLimit) {
      return input.substring(0, charLimit) + '...';
    }
    return input;
  }

  
  export function capitalizeFirstLetter(input: string): string {
    if (!input) return '';
    return input.charAt(0).toUpperCase() + input.slice(1);
  }


  
