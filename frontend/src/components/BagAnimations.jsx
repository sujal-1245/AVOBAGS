import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt"; // install: npm i react-parallax-tilt
import Section from "./Section";
import SuitcaseLottie from "./SuitcaseLottie";

export default function BagAnimations({ isDark }) {
  const cards = [
    "/assets/yellow post.heic",
    "/assets/greenbg_graybag.jpg",
    "/assets/blackbag.jpg",
    "/assets/redbag.heic",
  ];

  return (
    <Section
      id="bag-animations"
      className={`${
        isDark
          ? "bg-gradient-to-b from-black/80 to-black"
          : "bg-gradient-to-b from-white to-gray-100"
      }`}
    >
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Suitcase Animation on top */}
        <div className="col-span-full flex gap-5 justify-center mb-8">
          {[0, 1, 2].map((i) => (
            <Tilt
              key={i}
              glareEnable={true}
              glareMaxOpacity={0.1}
              scale={1.05}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              className={`rounded-2xl p-6 flex items-center justify-center ${
                isDark ? "bg-white/5" : "bg-black/5"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32"
              />
            </Tilt>
          ))}
        </div>

        {/* Text about bags */}
        <div>
          <SuitcaseLottie path="/assets/Mala Andando.json" />
          <motion.h2
            className="text-4xl font-bold mt-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Bags that make a statement
          </motion.h2>
          <motion.p
            className="mt-4 text-lg opacity-80"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover our premium collection of bags — crafted for style,
            comfort, and durability.
          </motion.p>
        </div>

        {/* Bag images */}
        <div className="grid grid-cols-2 gap-6">
          {cards.map((path, i) => (
            <Tilt
              key={i}
              glareEnable={true}
              glareMaxOpacity={0.1}
              scale={1.05}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              className={`rounded-2xl p-6 flex items-center justify-center ${
                isDark ? "bg-white/5" : "bg-black/5"
              }`}
            >
              <motion.img
                src={path}
                alt={`bag ${i + 1}`}
                className="w-48 h-48 object-cover rounded-md shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </Tilt>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
