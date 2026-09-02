import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speechService } from '../services/speech';

interface VoiceButtonProps {
  textToSpeak: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  textToSpeak,
  size = 'md',
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speechService.speak(textToSpeak, () => {
        setIsPlaying(false);
      });
    }
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 26
  };

  return (
    <button
      onClick={handleClick}
      title="點擊朗讀題目"
      aria-label="語音朗讀"
      className={`inline-flex items-center justify-center rounded-2xl font-bold transition-all ${sizeClasses[size]} ${
        isPlaying
          ? 'bg-amber-400 text-amber-950 scale-105 shadow-md ring-4 ring-amber-300 animate-pulse'
          : 'bg-amber-100 hover:bg-amber-200 text-amber-800 shadow-sm active:scale-95'
      } ${className}`}
    >
      <Volume2 size={iconSizes[size]} className={isPlaying ? 'animate-bounce' : ''} />
      <span className="ml-1.5 text-xs hidden sm:inline">
        {isPlaying ? '朗讀中...' : '聽題目'}
      </span>
    </button>
  );
};
