import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Lock, Sparkles } from "lucide-react";

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  // ============================================
  // TODO: CHANGE THIS TO YOUR ANNIVERSARY DATE
  // Format: any string you want (e.g., "14-02", "140223", "valentine")
  // ============================================
  const SECRET_PASSWORD = "13-05";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === SECRET_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setError(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4 overflow-hidden relative">
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/40"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 400),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Heart className="w-6 h-6 fill-current" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: shake ? [0, -10, 10, -10, 10, 0] : 0,
        }}
        transition={{
          duration: 0.6,
          x: { duration: 0.4 },
        }}
        className="kawaii-card max-w-md w-full text-center relative"
      >
        {/* Lock Icon */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
        >
          <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <Lock className="w-10 h-10 text-primary" />
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          🔐 Secret Gate
        </h1>
        <p className="text-muted-foreground mb-6">
          Enter our special date to unlock my surprise for you! 💕
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the special date..."
              className={`kawaii-input w-full text-lg ${
                error ? "border-destructive ring-destructive/20" : ""
              }`}
            />
            <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-sm"
            >
              Hmm... that's not right! Try again 🥺
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="kawaii-button w-full text-lg"
          >
            Unlock My Surprise 💝
          </motion.button>
        </form>

        {/* Hint */}
        <p className="text-sm text-muted-foreground mt-6">
          Hint: It's a date that means everything to us... 🌸
        </p>
      </motion.div>
    </div>
  );
};

export default LockScreen;
