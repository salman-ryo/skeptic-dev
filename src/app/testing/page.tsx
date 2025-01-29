import Link from 'next/link';
import Image from 'next/image';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export default function BlogPage() {
  // Mock data - replace with your actual data
  const blogs: Blog[] = [
    {
      id: '1',
      title: 'The Future of Web Development',
      excerpt: 'Exploring emerging trends and technologies shaping the future of web development...',
      slug: 'future-of-web-dev',
      date: '2024-03-15',
      readTime: '5 min',
      category: 'Technology',
      image: '/images/blogs/skhero.jpg',
    },
    {
      id: '1',
      title: 'The Future of Web Development',
      excerpt: 'Exploring emerging trends and technologies shaping the future of web development...',
      slug: 'future-of-web-dev',
      date: '2024-03-15',
      readTime: '5 min',
      category: 'Technology',
      image: '/images/blogs/skhero.jpg',
    },
    {
      id: '1',
      title: 'The Future of Web Development',
      excerpt: 'Exploring emerging trends and technologies shaping the future of web development...',
      slug: 'future-of-web-dev',
      date: '2024-03-15',
      readTime: '5 min',
      category: 'Technology',
      image: '/images/blogs/skhero.jpg',
    },
    {
      id: '1',
      title: 'The Future of Web Development',
      excerpt: 'Exploring emerging trends and technologies shaping the future of web development...',
      slug: 'future-of-web-dev',
      date: '2024-03-15',
      readTime: '5 min',
      category: 'Technology',
      image: '/images/blogs/skhero.jpg',
    },
    {
      id: '1',
      title: 'The Future of Web Development',
      excerpt: 'Exploring emerging trends and technologies shaping the future of web development...',
      slug: 'future-of-web-dev',
      date: '2024-03-15',
      readTime: '5 min',
      category: 'Technology',
      image: '/images/blogs/skhero.jpg',
    },
    {
      id: '1',
      title: 'The Future of Web Development',
      excerpt: 'Exploring emerging trends and technologies shaping the future of web development...',
      slug: 'future-of-web-dev',
      date: '2024-03-15',
      readTime: '5 min',
      category: 'Technology',
      image: '/images/blogs/skhero.jpg',
    },
    {
      id: '1',
      title: 'The Future of Web Development',
      excerpt: 'Exploring emerging trends and technologies shaping the future of web development...',
      slug: 'future-of-web-dev',
      date: '2024-03-15',
      readTime: '5 min',
      category: 'Technology',
      image: '/images/blogs/skhero.jpg',
    },
    // Add more blog objects
  ];

  const categories = [
    'All',
    'Technology',
    'Design',
    'Development',
    'Career',
    'Tutorials',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog & Insights</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl">
            Explore our collection of articles, tutorials, and industry insights
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-200"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Blog Post */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow rotating-border rotating-border--rainbow">
          <div className="grid md:grid-cols-2">
            <div className="relative h-96">
              <Image
                src={blogs[0].image}
                alt={blogs[0].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <span className="text-blue-600 font-semibold text-sm">
                {blogs[0].category}
              </span>
              <h2 className="text-3xl font-bold mt-4 mb-4">{blogs[0].title}</h2>
              <p className="text-gray-600 mb-6">{blogs[0].excerpt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{blogs[0].date}</span>
                <span>{blogs[0].readTime} read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-blue-600 text-sm font-semibold">
                  {blog.category}
                </span>
                <h3 className="font-bold text-xl mt-2 mb-3">{blog.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{blog.date}</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for the latest articles and resources
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="max-w-6xl mx-auto px-4 py-12 flex justify-center">
        <nav className="flex gap-4">
          <button className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:shadow-md">
            1
          </button>
          <button className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md">
            2
          </button>
          <button className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}