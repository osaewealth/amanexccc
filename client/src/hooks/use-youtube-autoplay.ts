import { useEffect, useRef } from 'react';

interface UseYouTubeAutoplayOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useYouTubeAutoplay = (options: UseYouTubeAutoplayOptions = {}) => {
  const { threshold = 0.5, rootMargin = '0px' } = options;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isPlayingRef.current) {
            // Play video when it comes into view
            const videoId = extractVideoId(iframe.src);
            if (videoId) {
              playVideo(videoId);
              isPlayingRef.current = true;
            }
          } else if (!entry.isIntersecting && isPlayingRef.current) {
            // Pause video when it goes out of view
            const videoId = extractVideoId(iframe.src);
            if (videoId) {
              pauseVideo(videoId);
              isPlayingRef.current = false;
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(iframe);

    return () => {
      observer.disconnect();
      // Clean up: pause video when component unmounts
      const videoId = extractVideoId(iframe.src);
      if (videoId && isPlayingRef.current) {
        pauseVideo(videoId);
      }
    };
  }, [threshold, rootMargin]);

  return iframeRef;
};

// Helper function to extract video ID from YouTube URL
const extractVideoId = (url: string): string | null => {
  const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/);
  return match ? match[1] : null;
};

// Helper function to play video using YouTube API
const playVideo = (videoId: string) => {
  const iframe = document.querySelector(`iframe[src*="${videoId}"]`) as HTMLIFrameElement;
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func: 'playVideo',
        args: '',
      }),
      'https://www.youtube.com'
    );
  }
};

// Helper function to pause video using YouTube API
const pauseVideo = (videoId: string) => {
  const iframe = document.querySelector(`iframe[src*="${videoId}"]`) as HTMLIFrameElement;
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func: 'pauseVideo',
        args: '',
      }),
      'https://www.youtube.com'
    );
  }
};
