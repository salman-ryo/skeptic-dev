"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const LoadingPage: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    }),
  }

  const pulseVariants = {
    initial: { scale: 0.8, opacity: 0.5 },
    animate: {
      scale: [0.8, 1.2, 0.8],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const progressVariants = {
    initial: { width: "0%" },
    animate: { width: `${progress}%` },
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gradient-to-br dark:from-blue-900 dark:via-purple-900 dark:to-pink-800">
      <div className="w-full max-w-md px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Loading...
        </h1>

        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-8">
          <motion.div
            className="h-full bg-blue-500 dark:bg-gradient-to-r dark:from-blue-400 dark:via-purple-500 dark:to-pink-500"
            variants={progressVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        <div className="flex justify-center space-x-2 mb-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-300"
              variants={circleVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            />
          ))}
        </div>

        <motion.div
          className="w-32 h-32 mx-auto mb-8 rounded-full border-4 border-gray-300 dark:border-gray-600"
          variants={pulseVariants}
          initial="initial"
          animate="animate"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-blue-400 dark:to-purple-600" />
        </motion.div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="h-8 bg-gray-300 dark:bg-gray-700 rounded"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            />
          ))}
        </div>

        <div className="text-center text-gray-600 dark:text-gray-300">
          <p className="text-lg mb-2">Please wait while we load your content</p>
          <p className="text-sm">This may take a few moments</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full">
        <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 70C840 80 960 100 1080 110C1200 120 1320 120 1380 120H1440V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V120Z"
            fill="currentColor"
            className="text-gray-200 dark:text-gray-800"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
      </div>

      <AnimatePresence>
        {progress === 100 && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-4xl font-bold text-gray-800 dark:text-gray-100"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Loading Complete!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LoadingPage

