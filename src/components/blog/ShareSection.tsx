import React from "react";
import { Mail, Facebook, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";

const ShareSection: React.FC = () => {
  const router = useRouter();
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareViaEmail = () => {
    const subject = encodeURIComponent("Check out this blog!");
    const body = encodeURIComponent(`I found this blog interesting: ${currentUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(facebookUrl, "_blank");
  };

  return (
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
        onClick={() => console.log("Bookmark clicked")}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-cBlack text-white hover:bg-gray-600 transition"
        aria-label="Bookmark"
      >
        <Bookmark className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ShareSection;
