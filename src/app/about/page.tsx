export default function AboutPage() {
  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gradient-to-br dark:from-indigo-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Newspaper texture in light mode */}
          <div className="absolute inset-0 bg-[url('/svg/newspaper-texture.svg')] opacity-10 dark:opacity-0 pointer-events-none" />
          
          {/* Space stars effect in dark mode */}
          <div className="absolute inset-0 bg-[url('/svg/star-pattern.svg')] opacity-0 dark:opacity-20 pointer-events-none" />

          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white relative 
            before:content-[''] before:absolute before:-bottom-2 before:left-0 before:w-16 before:h-1 
            before:bg-gray-900 before:dark:bg-white before:rounded-full">
            About Me
          </h1>

          <div className="prose dark:prose-invert prose-lg relative
            md:columns-2 md:gap-8
            border-l-2 border-gray-200 dark:border-gray-600 pl-6
            [column-rule:2px_solid_#e5e7eb] dark:[column-rule:2px_solid_#4b5563]">
            
            <div className="md:-mt-2">
              <img 
                src="/images/profile.jpg" 
                alt="Profile" 
                className="w-32 h-32 float-right ml-6 mb-4 rounded-full border-4 border-gray-100 
                  dark:border-gray-800 shadow-lg dark:shadow-gray-900/50"
              />
              
              <p className="mt-0">
                Hello! I'm a passionate blogger and web developer. I love creating content that inspires and educates
                others. My journey in the world of technology has been an exciting adventure, and I'm always eager to learn
                and share new things.
              </p>
            </div>

            <h2 className="text-2xl font-semibold mt-4 mb-3 
              border-b-2 border-gray-200 dark:border-gray-600 pb-2">
              My Background
            </h2>
            
            <p>
              I started my career as a software engineer, but my love for writing led me to explore the world of blogging.
              Now, I combine my technical expertise with my writing skills to create engaging content about web
              development, technology trends, and personal growth.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-3 
              border-b-2 border-gray-200 dark:border-gray-600 pb-2">
              What I Do
            </h2>
            
            <ul className="space-y-2 pl-4 
              [&>li]:before:content-['▹'] [&>li]:before:text-gray-600 [&>li]:before:dark:text-gray-400 
              [&>li]:before:pr-4 [&>li]:before:absolute [&>li]:before:-ml-4">
              <li>Write informative blog posts on web development and technology</li>
              <li>Create tutorials to help others learn coding skills</li>
              <li>Share my personal experiences and insights in the tech industry</li>
              <li>Explore new technologies and frameworks</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-3 
              border-b-2 border-gray-200 dark:border-gray-600 pb-2">
              My Mission
            </h2>
            
            <p>
              My goal is to make technology more accessible and understandable for everyone. I believe that knowledge
              should be shared freely, and I strive to create content that empowers others to pursue their passions in the
              world of technology.
            </p>
          </div>

          <div className="mt-8 flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                transition-colors duration-200">
              <span className="sr-only">Twitter</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                transition-colors duration-200">
              <span className="sr-only">GitHub</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}