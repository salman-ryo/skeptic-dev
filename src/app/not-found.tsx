'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Ghost, MoveLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { H2 } from '@/components/text/heading';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 select-none"
        >
          <span className="text-[28rem] font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200 dark:from-gray-700 dark:to-gray-600">
            404
          </span>
        </div>

        {/* Main content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative space-y-6"
        >
          <div className="inline-flex items-center justify-center bg-red-100 dark:bg-red-900/30 px-4 py-2 text-black mb-8 rounded-none rounded-tr-3xl rounded-bl-3xl border-gray-600 border-l-4 border-b-2
          dark:border-cPeach dark:text-gray-200
          ">
            <Ghost className="h-5 w-5 mr-2 animate-pulse" />
            <span className="font-medium  dark:text-white">Page Haunted Away</span>
          </div>

          <H2 className='text-gray-200'>
            Lost in the Digital Void
          </H2>

          <p className="text-base text-gray-100 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
            The page you're seeking has either vanished into the ether or never existed. 
            Let's get you back to familiar territory.
          </p>

          <div className="flex justify-center space-x-4">
          <Link href="/">
        <Button className="bg-cGray-dark border-2 
        dark:bg-black dark:hover:bg-black/80 dark:border-cPeach-dark dark:text-white
        ">
          Back to Home
        </Button>
      </Link>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            Error code: 404 | You might want to check the URL or{' '}
            <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
              contact support
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}