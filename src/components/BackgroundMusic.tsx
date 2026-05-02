import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2); // Default 20% volume
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioUrl = "https://drive.google.com/uc?id=1qJR5ALpC12fOtDQ5Euo7rL_Cg3BZMK_K";

  useEffect(() => {
    // Initialize audio
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const playAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          // Remove listeners once playing
          window.removeEventListener('click', playAudio);
          window.removeEventListener('scroll', playAudio);
          window.removeEventListener('keydown', playAudio);
          window.removeEventListener('touchstart', playAudio);
        }).catch((err) => {
          console.warn("Play attempt failed:", err);
        });
      }
    };

    // Initial attempt
    playAudio();

    // Listen for any interaction to trigger play (browsers require this)
    window.addEventListener('click', playAudio);
    window.addEventListener('scroll', playAudio);
    window.addEventListener('keydown', playAudio);
    window.addEventListener('touchstart', playAudio);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener('click', playAudio);
      window.removeEventListener('scroll', playAudio);
      window.removeEventListener('keydown', playAudio);
      window.removeEventListener('touchstart', playAudio);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100] flex items-center group">
      <AnimatePresence>
        {showControls && (
          <motion.div 
            initial={{ opacity: 0, x: -20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 'auto' }}
            exit={{ opacity: 0, x: -20, width: 0 }}
            className="bg-white/90 backdrop-blur-xl border border-slate-100 p-4 rounded-2xl mr-4 shadow-2xl flex items-center gap-4 overflow-hidden"
          >
            <div className="flex flex-col gap-1 w-32">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Âm lượng</span>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume} 
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-[#34A853] h-1 bg-slate-100 rounded-full appearance-none cursor-pointer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={togglePlay}
        onMouseEnter={() => setShowControls(true)}
        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-2xl ${isPlaying ? 'bg-[#34A853] text-white animate-pulse' : 'bg-white text-slate-400 border border-slate-100'}`}
        title={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc nền"}
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none shadow-xl">
          {isPlaying ? "Đang phát nhạc nền" : "Nhạc nền đang tắt"}
        </div>
        
        {isPlaying ? (
          <div className="flex gap-0.5 items-end h-4">
            <motion.div animate={{ height: [8, 16, 12, 16, 8] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-white rounded-full"></motion.div>
            <motion.div animate={{ height: [12, 8, 16, 8, 12] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-white rounded-full"></motion.div>
            <motion.div animate={{ height: [16, 12, 8, 12, 16] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1 bg-white rounded-full"></motion.div>
            <motion.div animate={{ height: [8, 16, 4, 16, 8] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-1 bg-white rounded-full"></motion.div>
          </div>
        ) : (
          <Music className="w-6 h-6" />
        )}
      </button>

      <div 
        className="ml-2 bg-white/50 backdrop-blur-md p-2 rounded-full cursor-pointer hover:bg-white transition-all shadow-sm"
        onMouseEnter={() => setShowControls(true)}
        onClick={() => setShowControls(!showControls)}
      >
        {volume === 0 ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#34A853]" />}
      </div>
    </div>
  );
};

export default BackgroundMusic;
