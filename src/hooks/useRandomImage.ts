"use client"

import { useMemo } from "react";

type ImageType = {
    name: string;
    url: string;
  };

// Hook to get random image with consistent result
const seededRandom = (seed: number = 5000): number => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const images: ImageType[] = [
    { name: 'Tech Blog depiction', url: "/images/codeblack.jpg" },
    { name: 'Tech Blog depiction', url: "/images/codeblue.jpg" },
    { name: 'Tech Blog depiction', url: "/images/codegreen.jpg" },
    { name: 'Tech Blog depiction', url: "/images/laptop.jpg" },
  ];

  export const useRandomImage = (seed?: number): ImageType => {
    return useMemo(() => {
      // Use the provided seed or create one from the current item's index
      const currentSeed = seed ?? Math.floor(Math.random() * 10000);
      const randomIndex = Math.floor(seededRandom(currentSeed) * images.length);
      return images[randomIndex];
    }, [seed]);
  };