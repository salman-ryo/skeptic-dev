// components/blog/ShareSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Mail, Facebook, Bookmark, Copy, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useCustomToast } from "@/hooks/useCustomToast";
import SimpleTooltip from "../common/SimpleTooltip";
import { Button } from "../ui/button";

interface ShareSectionProps {
  blogId: string;
}

const ShareSection: React.FC<ShareSectionProps> = ({ blogId }) => {
  const { data: session } = useSession();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const { successToast, errorToast } = useCustomToast();

  // Use the current URL for sharing and as a callback URL after login.
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

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
    if(!blogId){
      errorToast("Failed","No actual blog ID")
      return
    }
    if (!session) {
      setShowLoginModal(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/user/blogs/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId }),
      });
      const data = await res.json();
      setIsSaved(data.saved);
      successToast(
        data.saved ? "Saved" : "Removed",
        `Blog has been ${data.saved ? "added to" : "removed from"} 'Saved Blogs'`
      );
    } catch (error: any) {
      console.error("Error saving blog:", error);
      errorToast("Failed to save", error.message);
    } finally {
      setLoading(false);
    }
  };

  const shareViaEmail = () => {
    if(!blogId){
      errorToast("Failed","No actual blog ID")
      return
    }
    const subject = encodeURIComponent("Check out this blog!");
    const body = encodeURIComponent(
      `I found this blog interesting: ${currentUrl}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareToFacebook = () => {
    if(!blogId){
      errorToast("Failed","No actual blog ID")
      return
    }
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const handleLogin = () => {
    if(!blogId){
      errorToast("Failed","No actual blog ID")
      return
    }
    // Using NextAuth’s signIn function with callbackUrl ensures that after login
    // the user is redirected back to the current page.
    signIn("credentials", { callbackUrl: currentUrl });
  };

  const copyLink = async () => {
    if(!blogId){
      errorToast("Failed","No actual blog ID")
      return
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      successToast(
        "Link Copied",
        "The blog link has been copied to clipboard."
      );
    } catch (error) {
      errorToast("Copy Failed", "Could not copy the link.");
    }
  };
  return (
    <>
      <div className="flex items-center space-x-4 mt-6">
        <SimpleTooltip content="Share Blog via Email">
          <button
            onClick={shareViaEmail}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-cBlack text-white border-2 hover:bg-black transition
            dark:bg-cPeach-dark dark:text-black dark:hover:bg-black dark:border-cPeach-dark dark:hover:text-white
            "
            aria-label="Share via Email"
          >
            <Mail className="w-5 h-5" />
          </button>
        </SimpleTooltip>
        <SimpleTooltip content="Share Blog to Facebook">
          <button
            onClick={shareToFacebook}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-cBlack text-white border-2 hover:bg-black transition
            dark:bg-cPeach-dark dark:text-black dark:hover:bg-black dark:border-cPeach-dark dark:hover:text-white
            "
            aria-label="Share to Facebook"
          >
            <Facebook className="w-5 h-5" />
          </button>
        </SimpleTooltip>
        <SimpleTooltip content="Copy Link">
          <button
            onClick={copyLink}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-cBlack text-white border-2 hover:bg-black transition
            dark:bg-cPeach-dark dark:text-black dark:hover:bg-black dark:border-cPeach-dark dark:hover:text-white
            "
            aria-label="Copy Link"
          >
            <Link className="w-5 h-5" />
          </button>
        </SimpleTooltip>
        <SimpleTooltip content={isSaved ? "Unsave Blog" : "Save Blog"}>
          <button
            onClick={toggleSave}
            className={`flex items-center ${isSaved ? "fill-current text-cyan-500 dark:bg-black dark:border-cPeach-dark" : "text-white dark:bg-cPeach-dark dark:text-black dark:hover:bg-black dark:border-cPeach-dark dark:hover:text-white"} border-2 justify-center w-10 h-10 rounded-full bg-cBlack hover:bg-gray-600 transition
            `}
            aria-label="Bookmark"
          >
            {/* Change icon appearance if saved */}
            <Bookmark className={`w-5 h-5`} />
          </button>
        </SimpleTooltip>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-10 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Login Required</h2>
            <p className="mb-8">You need to log in to Save blogs.</p>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={() => setShowLoginModal(false)}
                variant={"secondary"}
                className="border-gray-400 border-2"
              >
                Cancel
              </Button>
              <Button
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareSection;
