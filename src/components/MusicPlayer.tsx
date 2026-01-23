import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, Volume2, VolumeX } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // ============================================
  // TODO: PUT YOUR MUSIC FILE HERE
  // Place your mp3 file in public/music/ folder
  // Example: /music/song.mp3
  // ============================================
  const MUSIC_SOURCE = "/music/song.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay was prevented
          console.log("Autoplay prevented - user needs to interact first");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SOURCE} preload="auto" />

      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <div
          className="relative"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Expanded controls */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  className="w-12 h-12 bg-card rounded-full shadow-kawaii flex items-center justify-center text-primary border-2 border-primary/30"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main play button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={
              isPlaying
                ? {
                    boxShadow: [
                      "0 0 0 0 hsl(340 80% 78% / 0.4)",
                      "0 0 0 15px hsl(340 80% 78% / 0)",
                    ],
                  }
                : {}
            }
            transition={
              isPlaying
                ? {
                    duration: 1.5,
                    repeat: Infinity,
                  }
                : {}
            }
            onClick={togglePlay}
            className="w-14 h-14 bg-primary rounded-full shadow-float flex items-center justify-center text-primary-foreground relative"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}

            {/* Music notes animation */}
            {isPlaying && (
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{
                  y: [-5, -15],
                  opacity: [1, 0],
                  rotate: [0, 20],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              >
                <Music className="w-4 h-4 text-primary" />
              </motion.div>
            )}
          </motion.button>

          {/* Playing indicator */}
          {isPlaying && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-primary rounded-full"
                  animate={{ height: [4, 12, 4] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default MusicPlayer;
