import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingBag,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import PRODUCTS from "../../data/products";

export default function Hero({ navigate, scrollToFeatures }) {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => slideNext(), 5000); // faster interval
    return () => clearInterval(interval);
  }, [index]);

  const slideNext = () => setIndex((prev) => (prev + 1) % PRODUCTS.length);
  const slidePrev = () =>
    setIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  const goToSlide = (i) => setIndex(i);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) slideNext();
    else if (info.offset.x > 50) slidePrev();
  };

  const featured = PRODUCTS[index];
  if (!featured) return null;

  return (
    <section className="relative w-full flex justify-center py-24 bg-gray-100 dark:bg-black/50">
      {/* Outer Container */}
      <div className="relative w-full max-w-6xl p-8 md:p-12 rounded-3xl backdrop-blur-xl bg-white/30 dark:bg-black/50 shadow-2xl flex flex-col items-center transition-colors duration-700 overflow-hidden">
        {/* Floating Glow Orbs */}
        <motion.div
          className="absolute top-12 left-12 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 dark:from-yellow-900/30 dark:to-yellow-400/30 blur-[120px] rounded-full"
          animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-12 right-12 w-[28rem] h-[28rem] bg-gradient-to-tr from-yellow-200/20 to-yellow-400/20 dark:from-yellow-400/30 dark:to-yellow-200/30 blur-[160px] rounded-full"
          animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Slider Container */}
        <div
          ref={sliderRef}
          className="relative w-full flex items-center justify-center overflow-hidden rounded-3xl"
        >
          {/* Prev Button */}
          <button
            onClick={slidePrev}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/40 dark:bg-black/40 hover:bg-white/60 dark:hover:bg-black/60 p-3 rounded-full shadow-md transition"
          >
            <FiChevronLeft className="text-2xl text-yellow-600 dark:text-yellow-300" />
          </button>

          {/* Next Button */}
          <button
            onClick={slideNext}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/40 dark:bg-black/40 hover:bg-white/60 dark:hover:bg-black/60 p-3 rounded-full shadow-md transition"
          >
            <FiChevronRight className="text-2xl text-yellow-600 dark:text-yellow-300" />
          </button>

          {/* AnimatePresence Slider */}
          <AnimatePresence mode="wait">
            <motion.div
              key={featured.id}
              className="flex flex-col md:flex-row items-center w-full cursor-grab select-none"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* LEFT - TEXT */}
              <motion.div
                className="flex-1 md:pr-10"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, x: -40 },
                  visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.15 } },
                }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 bg-white/30 dark:bg-black/30 backdrop-blur-md px-4 py-2 rounded-full text-sm text-yellow-700 dark:text-yellow-200 mb-6 shadow-lg border border-yellow-400/30"
                  variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <FiShoppingBag className="text-yellow-500" />
                  <span>Spring 2025 • Ultra Edition</span>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white"
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                >
                  <span className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 dark:from-yellow-400 dark:via-yellow-300 dark:to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,200,0,0.3)]">
                    {featured.name.toUpperCase()}
                  </span>
                  <br />
                  Elevated. Everyday.
                </motion.h1>

                <motion.p
                  className="text-gray-800 dark:text-yellow-100 max-w-lg mb-10 text-lg leading-relaxed"
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ delay: 0.2 }}
                >
                  {featured.desc || "Crafted with timeless precision, designed for the modern era. Lifetime repairs. Limitless elegance. Your everyday, redefined."}
                </motion.p>

                <motion.div
                  className="flex gap-4"
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    onClick={() => navigate("/shop")}
                    className="px-8 py-3 rounded-full font-semibold text-white dark:text-black bg-gradient-to-r from-yellow-500 to-yellow-400 dark:from-yellow-400 dark:to-yellow-300 shadow-lg hover:scale-105 transition-transform"
                  >
                    Shop Now
                  </button>
                  <button
                    onClick={scrollToFeatures}
                    className="px-8 py-3 rounded-full font-semibold border border-yellow-400/60 text-yellow-700 dark:text-yellow-200 hover:bg-yellow-400/10 dark:hover:bg-yellow-400/10 backdrop-blur-sm transition-all"
                  >
                    Learn More <FiArrowRight className="inline ml-2" />
                  </button>
                </motion.div>
              </motion.div>

              {/* RIGHT - IMAGE */}
              <motion.div
                className="flex-1 relative flex justify-center md:justify-end mt-10 md:mt-0"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
              >
                {/* Glowing Frame */}
                <motion.div
                  className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-tr from-yellow-600/30 via-yellow-500/30 to-yellow-400/30 dark:from-yellow-600/30 dark:via-yellow-500/30 dark:to-yellow-400/30 blur-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                />

                {/* Product Image */}
                <motion.img
                  src={featured.img || featured.image || "/placeholder.png"}
                  alt={featured.name}
                  className="relative w-72 h-96 md:w-96 md:h-[450px] object-cover rounded-[2.5rem] shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex mt-10 gap-3">
          {PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === index
                  ? "bg-yellow-500 dark:bg-yellow-300"
                  : "bg-yellow-300/40 dark:bg-yellow-500/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
