"use client";

import { useState, useEffect } from 'react';

export default function ShareButton() {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // Get the current URL dynamically (works for both local and live)
    setCurrentUrl(window.location.href);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">Share this post:</p>
      <div className="flex flex-wrap gap-3">
        {/* WhatsApp Share */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          WhatsApp
        </a>

        {/* Facebook Share */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Facebook
        </a>

        {/* Copy Link Button */}
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}