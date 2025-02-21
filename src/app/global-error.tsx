'use client';

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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
        Oops! Something went wrong.
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300 text-center">
        An unexpected error has occurred. Please try again or come back later.
      </p>
      <button
        onClick={reset}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
      >
        Try Again
      </button>
    </div>
  );
}
