import { z } from "zod";
import sanitizeHtml from "sanitize-html";

const unsafeProtocols = [
  'javascript:', 'data:', 'ftp:', 'file:',
  'ws:', 'wss:', 'about:', 'mailto:'
];

const isPrivateIP = (hostname: string) => {
  return /(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)/.test(hostname);
};

const isGenerallySafeURL = (url: string) => {
  try {
    const parsed = new URL(url);
    if (unsafeProtocols.includes(parsed.protocol)) return false;
    if (isPrivateIP(parsed.hostname)) return false;
    if (parsed.hostname.includes('@')) return false;
    return true;
  } catch {
    return false;
  }
};

const sanitizeHTMLContent = (html: string) => {
  return sanitizeHtml(html, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'p', 'a', 'ul', 'ol', 'li',
      'b', 'i', 'strong', 'em', 'u', 'code', 'pre',
      'span', 'div', 'br', 'hr', 'mark'
    ],
    allowedAttributes: {
      a: ['href', 'rel', 'target'],
      span: ['style'],
      div: ['style'],
      mark: ['style'],
      code: ['class'],
      pre: ['class']
    },
    allowedSchemes: ['https', 'http'],
    allowedClasses: {
      code: ['language-*'],
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
    'heading1',
    'heading2',
    'image',
    'code',
    'quote',
    'bulletList',
    'numberedList',
    'youtube',
    'twitter',
    'divider'
  ]),
  content: z.string()
    .max(10000, "Content too long (max 10,000 characters)")
    .transform(html => sanitizeHTMLContent(html))
    .refine(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return (doc.body.textContent?.length || 0) <= 10000;
    }, "Content too long"),
  metadata: z.object({
    url: z.string()
      .url("Invalid URL format")
      .refine(url => isGenerallySafeURL(url), "Unsafe URL detected")
      .optional(),
    alt: z.string().max(200, "Alt text too long (max 200 characters)").optional(),
    language: z.string().max(50, "Language name too long").optional(),
    listItems: z.array(z.string()).optional(),
    embedId: z.string().optional(),
  }).strict().optional()
}).strict();

export const BlogValidationSchema = z.object({
   _id: z.string().optional(),  // Allow MongoDB _id
  title: z.string()
    .min(4, "Title is required (min 4 characters)")
    .max(200, "Title too long (max 200 characters)")
    .transform(s => s.trim()),
  description: z.string()
    .min(10, "Description is required (min 10 characters)")
    .max(2000, "Description too long (max 2000 characters)")
    .transform(s => s.trim()),
  blocks: z.array(BlockValidationSchema)
    .max(400, "Too many blocks (max 400)")
    .optional()
    .default([]),
  tags: z.array(
    z.string()
      .min(1, "Tag cannot be empty")
      .max(16, "Tag too long (max 16 characters)")
      .regex(/^[a-z0-9\-_]+$/i, "Invalid tag format (letters, numbers, - and _ only)")
  )
  .max(3, "Maximum 3 tags allowed")
  .optional()
  .default([]),
}).passthrough();
