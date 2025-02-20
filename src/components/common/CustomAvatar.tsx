"use client"
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';

interface User {
  name: string;
  image?: string;
}

interface AvatarProps {
  user: User;
  /** Additional classes to override or extend the default styling */
  className?: string;
}

const CustomAvatar: React.FC<AvatarProps> = ({ user, className }) => {
  // Edge case: if no user is provided, render nothing.
  if (!user) return null;

  const [imageError, setImageError] = useState(false);

  // When image loading fails, mark the error to trigger fallback.
  const handleImageError = () => {
    setImageError(true);
  };

  // Default container styles for the avatar.
  const baseClasses = 'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold';
  const avatarClasses = cn(baseClasses, className);

  // If a valid image URL exists and hasn't failed to load, render the image.
  if (user.image && !imageError) {
    return (
      <Image
        src={user.image}
        alt={user.name}
        width={1920}
        height={1080}
        priority
        className={avatarClasses}
        onError={handleImageError}
      />
    );
  }

  // Fallback: use the first letter of the user's name (or '?' if name is missing).
  const firstLetter = user.name?.charAt(0).toUpperCase() || '?';

  // A list of Tailwind background color classes.
  const bgColors = [
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-gray-500',
  ];

  // A simple hash function to deterministically pick a background color based on the name.
  const hashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  const colorIndex = Math.abs(hashCode(user.name)) % bgColors.length;
  const backgroundColor = bgColors[colorIndex];

  return <div className={cn(avatarClasses, backgroundColor)}>{firstLetter}</div>;
};

export default CustomAvatar;
