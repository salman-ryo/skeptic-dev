'use client';

import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error('Error caught by global error boundary:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 light:bg-white">
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 flex justify-center items-center">
       <span><ShieldAlert className='mr-2 size-10 mt-1 max-md:size-7' /></span> <span>Oops! Something went wrong.</span>
      </h1>
      <p className="text-cPeach-dark dark:text-gray-300 text-center mt-4 mb-8
      max-md:text-sm
      ">
        An unexpected error has occurred. Please try again or come back later.
      </p>
      <Button
         onClick={() => {
          reset();
          window.location.reload(); // Force reload if reset doesn't work
        }}
        className='bg-cGray-dark border-2
        dark:bg-black dark:hover:bg-black/80 dark:border-cPeach-dark dark:text-white dark:hover:text-cPeach-dark
        max-md:mt-4 max-md:text-xs
        '
      >
        Try Again
      </Button>
    </div>
  );
}
