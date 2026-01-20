import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const LoveTest = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesClicked, setYesClicked] = useState(false);
  const [noClicked, setNoClicked] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleNoHover = useCallback(() => {
    // Make the "No" button run away to a random position
    const maxX = 200;
    const maxY = 150;
    const newX = (Math.random() - 0.5) * maxX * 2;
    const newY = (Math.random() - 0.5) * maxY * 2;
    setNoButtonPos({ x: newX, y: newY });
  }, []);

  const handleYesClick = () => {
    setYesClicked(true);
    // Create heart explosion
    const newHearts = [...Array(15)].map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 300,
      y: -Math.random() * 200 - 50,
    }));
    setHearts(newHearts);
    setTimeout(() => setHearts([]), 2000);
  };

  const handleNoClick = () => {
    // If somehow the user clicks "No" (shouldn't happen but just in case)
    setNoClicked(true);
  };

  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="kawaii-card max-w-lg mx-auto text-center relative overflow-visible"
      >
        {/* Heart decorations */}
        <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-primary animate-pulse" />
        <Sparkles className="absolute -bottom-3 -left-3 w-6 h-6 text-accent animate-pulse" />

        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
          Quick Question! 🤔
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Do you love me? 💕
        </p>

        <div className="flex items-center justify-center gap-6 min-h-[120px] relative">
          {/* Yes Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYesClick}
            disabled={yesClicked}
            className="kawaii-button px-8 py-4 text-lg relative"
          >
            Yes! 💖
            
            {/* Floating hearts on click */}
            <AnimatePresence>
              {hearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  className="absolute text-primary pointer-events-none"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ 
                    x: heart.x, 
                    y: heart.y, 
                    opacity: 0, 
                    scale: 0.5,
                    rotate: Math.random() * 360
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <Heart className="w-6 h-6 fill-current" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.button>

          {/* No Button - Runs away! */}
          <motion.button
            animate={{ x: noButtonPos.x, y: noButtonPos.y }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            onClick={handleNoClick}
            className="px-8 py-4 text-lg bg-secondary text-secondary-foreground rounded-full font-semibold shadow-soft border-2 border-secondary transition-colors"
          >
            No 😢
          </motion.button>
        </div>

        {/* Yes clicked message */}
        <AnimatePresence>
          {yesClicked && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 p-6 bg-primary/10 rounded-2xl border-2 border-primary/30"
            >
              <p className="text-xl font-semibold text-primary">
                I knew it! 🥰💕
              </p>
              <p className="text-muted-foreground mt-2">
                You're the sweetest! I love you too! 💝
              </p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="mt-4 inline-block"
              >
                <Heart className="w-12 h-12 text-primary fill-current" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No clicked message (shouldn't really happen) */}
        <AnimatePresence>
          {noClicked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setNoClicked(false)}
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="kawaii-card max-w-sm text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-6xl mb-4">😤</p>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Wah kamu selingkuh!
                </h3>
                <p className="text-muted-foreground mb-4">
                  Just kidding! I know you love me really 💕
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNoClicked(false)}
                  className="kawaii-button"
                >
                  Okay, I'm sorry! 🥺
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default LoveTest;
