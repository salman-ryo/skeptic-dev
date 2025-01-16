// types/Blog.ts
interface Blog {
    id: string;
    title: string;
    slug: string;
    content: string;  // This will store MDX/Markdown content
    createdAt: Date;
    updatedAt: Date;
    metadata: {
      author: string;
      tags: string[];
      coverImage?: string;
      excerpt?: string;
    };
  }
  
  // pages/admin/editor.tsx
  import { MDXEditor } from '@mdxeditor/editor';
  import { useState } from 'react';
  
  const BlogEditor = () => {
    const [blog, setBlog] = useState({
      title: '',
      content: '',
      metadata: {
        author: '',
        tags: [],
        coverImage: ''
      }
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog)
      });
    };
  
    return (
      <div className="p-6">
        <input 
          type="text"
          value={blog.title}
          onChange={(e) => setBlog({...blog, title: e.target.value})}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Blog Title"
        />
        
        <MDXEditor
          value={blog.content}
          onChange={(content) => setBlog({...blog, content})}
          className="min-h-[400px] border rounded"
        />
        
        <button 
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save Blog
        </button>
      </div>
    );
  };
  
  // server/routes/blog.js
  const express = require('express');
  const router = express.Router();
  const Blog = require('../models/Blog');
  
  router.post('/blogs', async (req, res) => {
    try {
      const { title, content, metadata } = req.body;
      const blog = new Blog({
        title,
        content,
        metadata,
        slug: title.toLowerCase().replace(/\s+/g, '-')
      });
      
      await blog.save();
      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // pages/blog/[slug].tsx
  import { MDXRemote } from 'next-mdx-remote';
  import { serialize } from 'next-mdx-remote/serialize';
  
  const BlogPost = ({ source, frontMatter }) => {
    return (
      <article className="prose lg:prose-xl mx-auto">
        <h1>{frontMatter.title}</h1>
        <MDXRemote {...source} components={{
          // Custom components for your MDX
          img: (props) => (
            <img {...props} className="w-full rounded-lg shadow-lg" />
          ),
          h2: (props) => (
            <h2 {...props} className="text-2xl font-bold mt-8 mb-4" />
          )
        }} />
      </article>
    );
  };
  
  export async function getStaticProps({ params }) {
    const blog = await getBlogBySlug(params.slug);
    const mdxSource = await serialize(blog.content);
  
    return {
      props: {
        source: mdxSource,
        frontMatter: blog.metadata
      }
    };
  }