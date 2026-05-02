import React, { useState } from 'react';
import { Volume2, Loader2, VolumeX } from 'lucide-react';
import { speakText } from '../services/geminiService';

interface SpeechButtonProps {
  text: string;
  audioUrl?: string;
  className?: string;
}

const SpeechButton: React.FC<SpeechButtonProps> = ({ text, audioUrl, className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSource, setCurrentSource] = useState<AudioBufferSourceNode | null>(null);
  const [externalAudio, setExternalAudio] = useState<HTMLAudioElement | null>(null);
  const [fallbackAudio, setFallbackAudio] = useState<HTMLAudioElement | null>(null);

  const playFallback = () => {
    // Piano music URL (royalty free classic piano)
    const audio = new Audio('https://cdn.pixabay.com/audio/2022/02/22/audio_d0c6ff1bab.mp3'); 
    audio.loop = true;
    audio.volume = 0.4;
    audio.play();
    setFallbackAudio(audio);
    setIsPlaying(true);
  };

  const stopAll = () => {
    if (currentSource) {
      currentSource.stop();
      setCurrentSource(null);
    }
    if (externalAudio) {
      externalAudio.pause();
      externalAudio.currentTime = 0;
      setExternalAudio(null);
    }
    if (fallbackAudio) {
      fallbackAudio.pause();
      fallbackAudio.currentTime = 0;
      setFallbackAudio(null);
    }
    setIsPlaying(false);
  };

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isPlaying) {
      stopAll();
      return;
    }

    if (audioUrl) {
      setIsLoading(true);
      try {
        const audio = new Audio(audioUrl);
        audio.play().then(() => {
          setIsLoading(false);
          setIsPlaying(true);
        }).catch(err => {
          console.error("External audio failed", err);
          throw err;
        });

        audio.onended = () => {
          setIsPlaying(false);
          setExternalAudio(null);
        };
        setExternalAudio(audio);
        return;
      } catch (err) {
        console.error("External audio playback error, falling back to AI/Music", err);
      }
    }

    setIsLoading(true);
    try {
      // Use 'Aoide' or 'Kore' for female voice
      const source = await speakText(text, 'Kore');
      if (source) {
        setCurrentSource(source);
        setIsPlaying(true);
        source.onended = () => {
          setIsPlaying(false);
          setCurrentSource(null);
        };
      } else {
        playFallback();
      }
    } catch (error) {
      console.error("Speech playback failed, falling back to piano music", error);
      playFallback();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-white text-[#34A853] hover:bg-[#34A853] hover:text-white transition-all shadow-xl shadow-green-900/5 border border-slate-100 disabled:opacity-50 active:scale-90 group/btn ${className}`}
      title={isPlaying ? "Dừng phát" : "Nghe nội dung (AI Voice)"}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isPlaying ? (
        <VolumeX className="w-6 h-6 animate-pulse" />
      ) : (
        <div className="relative">
          <Volume2 className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#EA4335] rounded-full border-2 border-white group-hover/btn:animate-ping"></span>
        </div>
      )}
    </button>
  );
};

export default SpeechButton;
