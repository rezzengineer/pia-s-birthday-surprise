import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Cake, PartyPopper, Sparkles, Star } from "lucide-react";

// ============================================
// TODO: CHANGE THE NAME HERE IF NEEDED
// ============================================
const BIRTHDAY_NAME = "Pia";

const BirthdayHeader = () => {
  const hasTriggeredConfetti = useRef(false);

  useEffect(() => {
    if (!hasTriggeredConfetti.current) {
      hasTriggeredConfetti.current = true;
      
      // Initial confetti explosion
      const duration = 4000;
      const end = Date.now() + duration;

      // Heart-shaped confetti colors matching our palette
      const colors = ["#f8b4d9", "#a5d8ff", "#b2f2bb", "#fcc2d7", "#fff3bf"];

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors,
          shapes: ["circle", "square"],
          scalar: 1.2,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors,
          shapes: ["circle", "square"],
          scalar: 1.2,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      // Big center burst first
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors,
        shapes: ["circle", "square"],
        scalar: 1.5,
      });

      frame();
    }
  }, []);

  return (
    <header className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-16 px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating stars */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-primary/30"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              y: ["-10%", "110%"],
              rotate: 360,
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear",
            }}
          >
            <Star className="w-4 h-4 fill-current" />
          </motion.div>
        ))}

        {/* Sparkle decorations */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Sparkles className="w-6 h-6 text-accent" />
          </motion.div>
        ))}
      </div>

      <div className="text-center relative z-10 max-w-3xl mx-auto">
        {/* Party poppers */}
        <div className="flex justify-center gap-4 mb-6">
          <motion.div
            animate={{ rotate: [-15, 0, -15] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <PartyPopper className="w-10 h-10 md:w-12 md:h-12 text-accent" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Cake className="w-12 h-12 md:w-16 md:h-16 text-primary" />
          </motion.div>
          <motion.div
            animate={{ rotate: [15, 0, 15] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <PartyPopper className="w-10 h-10 md:w-12 md:h-12 text-secondary-foreground transform scale-x-[-1]" />
          </motion.div>
        </div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
        >
          <span className="text-gradient bg-gradient-to-r from-primary via-accent to-secondary-foreground">
            Happy Birthday,
          </span>
          <br />
          <motion.span
            animate={{ 
              textShadow: [
                "0 0 10px hsl(var(--primary) / 0.5)",
                "0 0 20px hsl(var(--primary) / 0.8)",
                "0 0 10px hsl(var(--primary) / 0.5)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-primary inline-block mt-2"
          >
            {BIRTHDAY_NAME}! 🎂
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xl mx-auto"
        >
          Wishing you the most magical day filled with love, joy, and all the happiness in the world! 
          <span className="inline-block animate-bounce-slow ml-2">✨</span>
        </motion.p>

        {/* Decorative hearts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-3 mt-8"
        >
          {["💕", "🎀", "🌸", "💝", "🎈"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ 
                y: [0, -10, 0],
                rotate: [-5, 5, -5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="text-2xl md:text-3xl"
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </header>
  );
};

export default BirthdayHeader;
