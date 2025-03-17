import { z } from "zod";
import sanitizeHtml from "sanitize-html";

const unsafeProtocols = [
    'javascript:', 'data:', 'ftp:', 'file:',
    'ws:', 'wss:', 'about:', 'mailto:'
  ];

  const isPrivateIP = (hostname: string) => {
    return hostname.match(/(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)/);
  };

const isGenerallySafeURL = (url: string) => {
    try {
      const parsed = new URL(url);
      
      // Protocol check
      if (unsafeProtocols.includes(parsed.protocol)) return false;
      
      // IP address check
      if (isPrivateIP(parsed.hostname)) return false;
      
      // Domain validity
      if (parsed.hostname.includes('@')) return false; // Auth attempts
      
      return true;
    } catch {
      return false; // Invalid URL format
    }
  };

const sanitizeHTML = (html: string) => {
  return sanitizeHtml(html, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'p', 'a', 'ul', 'ol', 'li',
      'b', 'i', 'strong', 'em', 'u', 'code', 'pre',
      'span', 'div', 'br', 'hr', 'mark'
    ],
    allowedAttributes: {
      a: ['href', 'rel', 'target'],
      span: ['style'], // For highlight
      div: ['style'], // For text alignment
      mark: ['style'], // For highlight
      code: ['class'],
      pre: ['class']
    },
    allowedSchemes: ['https', 'http'],
    allowedClasses: {
      code: ['language-*'], // Allow code block language classes
      pre: ['language-*']
    },
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: 'noopener noreferrer',
          target: '_blank'
        }
      })
    }
  });
};

export const BlockValidationSchema = z.object({
  id: z.string().min(1, "Block id is required"),
  type: z.enum([
    'text',
    'heading',
    'list',
    'quote',
    'code',
    'divider',
    'image', // Future-proof
    'embed'  // Future-proof
  ]),
  content: z.string()
    .max(10000, "Content too long (max 10,000 characters)")
    .transform(html => sanitizeHTML(html))
    .refine(html => {
      // Additional security check for text content
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent?.length || 0 <= 10000;
    }, "Content too long")
    .optional(),
  metadata: z.object({
    url: z.string()
      .url("Invalid URL format")
      .refine(url => isGenerallySafeURL(url), "Unsafe URL detected")
      .optional(),
    alt: z.string().max(200, "Alt text too long (max 200 characters)").optional(),
    language: z.string().max(50, "Language name too long").optional(),
    level: z.number().min(1).max(3).optional(), // For headings
    listType: z.enum(['bullet', 'ordered']).optional(),
    align: z.enum(['left', 'center', 'right']).optional()
  }).strict().optional() // Prevent unknown metadata properties
}).strict();

export const BlogValidationSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(200, "Title too long (max 200 characters)")
    .transform(s => s.trim()),
  description: z.string()
    .min(1, "Description is required")
    .max(2000, "Description too long (max 2000 characters)")
    .transform(s => s.trim()),
  blocks: z.array(BlockValidationSchema)
    .max(400, "Too many blocks (max 400)")
    .optional()
    .default([]),
  tags: z.array(
    z.string()
      .min(1, "Tag cannot be empty")
      .max(56, "Tag too long (max 56 characters)")
      .regex(/^[a-z0-9\-_]+$/i, "Invalid tag format (letters, numbers, - and _ only)")
  )
  .max(5, "Maximum 5 tags allowed")
  .optional()
  .default([]),
}).strict();