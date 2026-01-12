import { useState, useEffect } from 'react';

interface UseTypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
}

export function useTypewriter({ text, speed = 200, delay = 15000 }: UseTypewriterProps) {
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    if (!isTyping) return;

    const typeInterval = setInterval(() => {
      setTypewriterIndex((prevIndex) => {
        if (prevIndex < text.length) {
          // Add pause between lines if text contains \n
          if (text[prevIndex] === '\n') {
            setTimeout(() => {
              setTypewriterIndex(prevIndex + 1);
            }, 800); // Wait 800ms before starting next line
            return prevIndex;
          }
          return prevIndex + 1;
        } else {
          // Finished typing, wait then reset
          setTimeout(() => {
            setTypewriterIndex(0);
          }, 1500); // Wait 1.5 seconds before restarting
          return prevIndex;
        }
      });
    }, speed);

    return () => clearInterval(typeInterval);
  }, [isTyping, text, speed]);

  // Reset typewriter every delay milliseconds
  useEffect(() => {
    const resetInterval = setInterval(() => {
      // Smooth transition: reset typewriter index
      setIsTyping(false);
      setTimeout(() => {
        setTypewriterIndex(0);
        setIsTyping(true);
      }, 200); // Reduced delay to 200ms for smoother transition
    }, delay);

    return () => clearInterval(resetInterval);
  }, [delay]);

  return { typewriterIndex, isTyping };
}