import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

// ============================================
// TODO: REPLACE WITH YOUR LOCAL IMAGES
// Place your images in public/img/ folder
// Example paths: "/img/foto1.jpg", "/img/foto2.jpg"
// ============================================
const GALLERY_IMAGES = [
  {
    src: "/img/pict1.jpeg",
    caption: "Cantiknya pacar aku 💕",
  },
  {
    src: "/img/pict2.jpeg",
    caption: "Wanita aku yang tercantik",
  },
  {
    src: "/img/pict3.jpeg",
    caption: "Pia ku yang tersayang ✨",
  },
  {
    src: "/img/pict4.jpeg",
    caption: "Wanita yang kucintai ☕",
  },
  {
    src: "/img/pict5.jpeg",
    caption: "Pacarku yang gemas 🎒",
  },
  {
    src: "/img/pict6.jpeg",
    caption: "My favorite person 💝",
  },
];

const PhotoGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

  const toggleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const navigatePhoto = (direction: "prev" | "next") => {
    if (selectedIndex === null) return;

    if (direction === "prev") {
      setSelectedIndex(
        selectedIndex === 0 ? GALLERY_IMAGES.length - 1 : selectedIndex - 1,
      );
    } else {
      setSelectedIndex(
        selectedIndex === GALLERY_IMAGES.length - 1 ? 0 : selectedIndex + 1,
      );
    }
  };

  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Camera className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Our Memories 📸
          </h2>
          <p className="text-muted-foreground">
            Every moment with you is precious 💕
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -5 }}
              className="break-inside-avoid relative group cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="rounded-3xl overflow-hidden shadow-kawaii border-2 border-primary/20 bg-card">
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Caption on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-primary-foreground text-sm font-medium">
                      {image.caption}
                    </p>
                  </div>

                  {/* Like button */}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => toggleLike(index, e)}
                    className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      likedPhotos.has(index)
                        ? "bg-primary text-primary-foreground"
                        : "bg-card/80 backdrop-blur text-primary"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${likedPhotos.has(index) ? "fill-current" : ""}`}
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedIndex(null)}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 w-12 h-12 bg-card rounded-full flex items-center justify-center text-foreground shadow-kawaii"
                onClick={() => setSelectedIndex(null)}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation */}
              <button
                className="absolute left-4 w-12 h-12 bg-card rounded-full flex items-center justify-center text-foreground shadow-kawaii"
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhoto("prev");
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                className="absolute right-4 w-12 h-12 bg-card rounded-full flex items-center justify-center text-foreground shadow-kawaii"
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhoto("next");
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <motion.div
                key={selectedIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="max-w-3xl max-h-[80vh] relative"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={GALLERY_IMAGES[selectedIndex].src}
                  alt={GALLERY_IMAGES[selectedIndex].caption}
                  className="max-w-full max-h-[70vh] object-contain rounded-3xl"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <p className="text-primary-foreground text-lg font-medium bg-foreground/50 backdrop-blur-sm rounded-full px-6 py-3 inline-block">
                    {GALLERY_IMAGES[selectedIndex].caption}
                  </p>
                </div>
              </motion.div>

              {/* Dots indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {GALLERY_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(i);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === selectedIndex ? "bg-primary w-6" : "bg-card/50"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default PhotoGallery;
