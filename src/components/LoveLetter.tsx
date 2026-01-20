import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Feather, Sparkles } from "lucide-react";

const LoveLetter = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  // ============================================
  // TODO: WRITE YOUR ROMANTIC LETTER HERE
  // Replace the text below with your heartfelt message
  // ============================================
  const LOVE_LETTER = `Dear Pia,

Happy Birthday to the most amazing person in my life! 🎂

From the moment we met, you've made my world brighter and more beautiful. Your smile lights up even my darkest days, and your laugh is my favorite sound in the entire universe.

Every day with you feels like a beautiful dream I never want to wake up from. You're not just my partner – you're my best friend, my confidant, and my greatest adventure.

I'm so grateful for every moment we share together, from our silly conversations to our quiet moments. You make everything better just by being you.

On this special day, I want you to know how deeply I love you and how lucky I feel to have you in my life. Here's to many more birthdays together, many more adventures, and a lifetime of love and happiness.

I love you to the moon and back! 🌙✨

Forever yours,
Your loving partner 💕`;

  useEffect(() => {
    if (hasStarted && !isTyping) {
      setIsTyping(true);
      let index = 0;
      
      const typingInterval = setInterval(() => {
        if (index < LOVE_LETTER.length) {
          setDisplayedText(LOVE_LETTER.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 30); // Typing speed in ms

      return () => clearInterval(typingInterval);
    }
  }, [hasStarted, LOVE_LETTER]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (letterRef.current) {
      observer.observe(letterRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  return (
    <section className="py-16 px-4" ref={letterRef}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Feather className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            A Letter For You 💌
          </h2>
          <p className="text-muted-foreground">
            Words from my heart to yours
          </p>
        </div>

        {/* Letter */}
        <motion.div
          initial={{ opacity: 0, rotateX: -10 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Decorative corners */}
          <Sparkles className="absolute -top-4 -left-4 w-8 h-8 text-primary/60" />
          <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-accent/60" />
          <Heart className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 text-primary fill-current animate-heart-beat" />

          <div className="kawaii-card bg-kawaii-cream/30 border-2 border-primary/30 p-8 md:p-10">
            {/* Letter paper texture effect */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none rounded-3xl"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 30px,
                  hsl(var(--primary)) 30px,
                  hsl(var(--primary)) 31px
                )`,
              }}
            />

            <div className="relative">
              <pre className="font-fredoka text-foreground whitespace-pre-wrap leading-relaxed text-base md:text-lg">
                {displayedText}
                {isTyping && (
                  <span className="typewriter-cursor text-primary font-bold">|</span>
                )}
              </pre>

              {/* Show full letter button */}
              {!hasStarted && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setHasStarted(true)}
                  className="kawaii-button mt-6"
                >
                  Read My Letter 💝
                </motion.button>
              )}

              {/* Completion message */}
              {!isTyping && displayedText.length === LOVE_LETTER.length && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 text-center"
                >
                  <div className="flex justify-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                      >
                        <Heart className="w-6 h-6 text-primary fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-primary font-semibold">
                    I love you more than words can say! 💕
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LoveLetter;
