// components/blog/ShareSection.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Facebook, Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

interface ShareSectionProps {
  blogId: string;
}

const ShareSection: React.FC<ShareSectionProps> = ({ blogId }) => {
  const { data: session } = useSession();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // Use the current URL for sharing and as a callback URL after login.
  const currentUrl =
    typeof window !== 'undefined' ? window.location.href : '';

  // On mount (or when session/blogId changes), check if this blog is already saved.
  useEffect(() => {
    if (session && blogId) {
      fetch(`/api/user/blogs/saved/${blogId}`)
        .then((res) => res.json())
        .then((data) => {
          setIsSaved(data.saved);
        })
        .catch((err) => console.error(err));
    }
  }, [session, blogId]);

  const toggleSave = async () => {
    // If the user isn’t logged in, show the login modal.
    if (!session) {
      setShowLoginModal(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/user/blogs/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId }),
      });
      const data = await res.json();
      setIsSaved(data.saved);
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent('Check out this blog!');
    const body = encodeURIComponent(`I found this blog interesting: ${currentUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(facebookUrl, '_blank');
  };

  const handleLogin = () => {
    // Using NextAuth’s signIn function with callbackUrl ensures that after login
    // the user is redirected back to the current page.
    signIn(undefined, { callbackUrl: currentUrl });
  };

  return (
    <>
      <div className="flex items-center space-x-4 mt-6">
        <button
          onClick={shareViaEmail}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-cBlack text-white hover:bg-black transition"
          aria-label="Share via Email"
        >
          <Mail className="w-5 h-5" />
        </button>
        <button
          onClick={shareToFacebook}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-cBlack text-white hover:bg-black transition"
          aria-label="Share to Facebook"
        >
          <Facebook className="w-5 h-5" />
        </button>
        <button
          onClick={toggleSave}
          className={`flex items-center ${isSaved ? 'fill-current text-cyan-500' : 'text-white'} justify-center w-10 h-10 rounded-full bg-cBlack hover:bg-gray-600 transition`}
          aria-label="Bookmark"
        >
          {/* Change icon appearance if saved */}
          <Bookmark
            className={`w-5 h-5`}
          />
        </button>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Login Required</h2>
            <p className="mb-4">You need to log in to save blogs.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareSection;
