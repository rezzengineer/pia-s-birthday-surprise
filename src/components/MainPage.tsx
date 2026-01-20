import { motion } from "framer-motion";
import BirthdayHeader from "./BirthdayHeader";
import MusicPlayer from "./MusicPlayer";
import LoveTest from "./LoveTest";
import PhotoGallery from "./PhotoGallery";
import LoveLetter from "./LoveLetter";
import { Heart, Sparkles } from "lucide-react";

const MainPage = () => {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Floating Music Player */}
      <MusicPlayer />

      {/* Background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, hsl(var(--kawaii-pink) / 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 70%, hsl(var(--kawaii-blue) / 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, hsl(var(--kawaii-mint) / 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Birthday Header with Confetti */}
        <BirthdayHeader />

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 py-8">
          <Sparkles className="w-5 h-5 text-primary/60" />
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <Heart className="w-6 h-6 text-primary fill-current animate-heart-beat" />
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <Sparkles className="w-5 h-5 text-primary/60" />
        </div>

        {/* Love Test Section */}
        <LoveTest />

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <span className="text-2xl">🌸</span>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        </div>

        {/* Photo Gallery */}
        <PhotoGallery />

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <span className="text-2xl">💌</span>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        {/* Love Letter */}
        <LoveLetter />

        {/* Footer */}
        <footer className="py-16 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto px-4"
          >
            <div className="kawaii-card">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-4"
              >
                💝
              </motion.div>
              <p className="text-xl font-semibold text-foreground mb-2">
                Made with all my love
              </p>
              <p className="text-muted-foreground">
                Happy Birthday, my love! Here's to many more years together. 🎂✨
              </p>
              <div className="flex justify-center gap-2 mt-4">
                {["🎀", "🌸", "💕", "🌸", "🎀"].map((emoji, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                    className="text-xl"
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </footer>
      </main>

      {/* Floating hearts animation in background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/20"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
              y: typeof window !== "undefined" ? window.innerHeight + 50 : 800,
            }}
            animate={{
              y: -100,
              x: `+=${(Math.random() - 0.5) * 100}`,
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          >
            <Heart className="w-8 h-8 fill-current" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
