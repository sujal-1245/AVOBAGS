// src/pages/Home.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import CountUp from "react-countup";
import { FiShoppingBag } from "react-icons/fi";
import { FaShippingFast, FaAward, FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import PRODUCTS from "../data/products";
import Hero from "../components/layout/Hero";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const navigate = useNavigate();
  const featured = { ...PRODUCTS[0], sold: 50000, years: 9, stores: 120 };
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      text: "AVOBAGS's craftsmanship is unparalleled. The tote I purchased is both stylish and durable, making it my go-to accessory.",
      img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
    {
      id: 2,
      name: "Aarav Patel",
      text: "I was searching for a bag that combines functionality with elegance. AVOBAGS delivered exactly that. Highly recommend!",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
      id: 3,
      name: "Ananya Iyer",
      text: "The attention to detail in AVOBAGS's designs is commendable. It's evident that quality is their top priority.",
      img: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    },
    {
      id: 4,
      name: "Ravi Kumar",
      text: "As someone always on the move, I needed a bag that could keep up. AVOBAGS's products are both practical and stylish.",
      img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
    {
      id: 5,
      name: "Neha Desai",
      text: "The minimalist design of AVOBAGS's bags aligns perfectly with my aesthetic. Plus, they're incredibly functional.",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
      id: 6,
      name: "Vikram Singh",
      text: "I appreciate the blend of tradition and modernity in AVOBAGS's designs. It's a reflection of India's rich heritage.",
      img: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    },
    {
      id: 7,
      name: "Simran Kaur",
      text: "AVOBAGS's bags are a testament to Indian craftsmanship. They're not just accessories; they're a statement.",
      img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
    {
      id: 8,
      name: "Arjun Reddy",
      text: "I needed a bag that could handle my daily essentials. AVOBAGS's products are both durable and stylish.",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
      id: 9,
      name: "Sanya Gupta",
      text: "The fusion of contemporary design with traditional elements in AVOBAGS's bags is truly unique.",
      img: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    },
    {
      id: 10,
      name: "Manoj Verma",
      text: "AVOBAGS's commitment to quality and design is evident in every product. A brand that truly understands its customers.",
      img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
  ];

  useEffect(() => {
    gsap.from(".feature-card", {
      y: 40,
      opacity: 0.85,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#features",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".product-card", {
      y: 40,
      opacity: 0.85,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#products",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans antialiased bg-white text-black dark:bg-black dark:text-white">
      {/* HERO */}
      <Hero />

      {/* COUNT-UP STATS */}
      <section
        className="py-20 bg-fixed bg-center bg-cover relative text-center text-white dark:text-white"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/626234448/photo/luxury-handbags.jpg?s=612x612&w=0&k=20&c=Zz4OsUc67DLv5wLftwYd1_NeYmQmb4RCBuaCVttpM4w=')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <motion.div
          className="relative container mx-auto px-6 grid md:grid-cols-3 gap-10 text-center text-white dark:text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {[
            { icon: FiShoppingBag, end: 50000, label: "Bags Sold" },
            { icon: FaAward, end: 9, label: "Years Crafting" },
            { icon: FaLeaf, end: 120, label: "Stockists" },
          ].map((stat, i) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={i}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i, duration: 1 }}
              >
                <StatIcon className="mx-auto text-5xl mb-4 text-yellow-400" />
                <h3 className="text-4xl font-bold">
                  <CountUp
                    end={stat.end}
                    duration={3}
                    enableScrollSpy
                    scrollSpyDelay={200}
                  />
                  +
                </h3>
                <p>{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-white dark:bg-black relative">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-black dark:text-white"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Why AVOBAGS
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FaShippingFast,
                title: "Fast, Insured Shipping",
                desc: "Trackable express delivery with premium packaging.",
              },
              {
                icon: FaAward,
                title: "Lifetime Repair",
                desc: "Repairs & parts for life — sustainability by design.",
              },
              {
                icon: FaLeaf,
                title: "Responsible Materials",
                desc: "Tanned leathers & recycled linings from vetted mills.",
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  className="feature-card p-10 bg-black/5 dark:bg-black/50 backdrop-blur-md rounded-3xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 border border-yellow-400/30"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 1 }}
                >
                  <Icon className="text-4xl mb-4 text-yellow-400" />
                  <h3 className="font-semibold text-xl text-black dark:text-white">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-yellow-800/80 dark:text-yellow-100/80">
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-24 bg-white dark:bg-black relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="flex items-center justify-between mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold text-black dark:text-white">
              Collection
            </h2>
            {/* <p className="text-yellow-700 dark:text-yellow-200 text-sm">
              Refined silhouettes for daily life
            </p> */}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={p.id}
                className="product-card relative rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition bg-yellow-50/40 dark:bg-[rgba(0,32,0,0.15)] backdrop-blur-xl"
                whileHover={{ y: -5, scale: 1.03 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 1 }}
              >
                <div className="relative h-80">
                  <motion.img
                    src={p.img || p.image}
                    alt={p.name}
                    className="w-full h-full object-cover rounded-3xl"
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                  <motion.div
                    className="absolute left-6 bottom-6 rounded-xl p-4 shadow-md bg-yellow-300/40 dark:bg-yellow-400/15"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                  >
                    <h4 className="font-semibold text-black dark:text-white">
                      {p.name}
                    </h4>
                    <p className="text-yellow-800 dark:text-yellow-100 text-sm mt-1">
                      {p.desc}
                    </p>
                  </motion.div>
                </div>
                <motion.div
                  className="p-6 flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                >
                  <motion.button
                    onClick={() => navigate("/shop")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold transition"
                  >
                    View Collection
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white dark:bg-black relative block md:hidden">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-black dark:text-white"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            What Customers Are Saying
          </motion.h2>

          <Swiper
            modules={[Autoplay, EffectCoverflow, Pagination]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1} // MOBILE override
            breakpoints={{
              640: { slidesPerView: 1 }, // sm and up still mobile style
            }}
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 120,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide
                key={t.id}
                style={{ width: 300 }}
                className="flex justify-center"
              >
                <motion.div
                  className="bg-white dark:bg-white/90 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition text-black"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 1 }}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <motion.img
                      src={t.img}
                      alt={t.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 1 }}
                    />
                    <div className="text-center sm:text-left mt-2 sm:mt-0">
                      <motion.p
                        className="italic text-gray-700 dark:text-gray-300 text-sm sm:text-base"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                      >
                        "{t.text}"
                      </motion.p>
                      <motion.p
                        className="mt-2 font-semibold text-black dark:text-white text-sm sm:text-base"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                      >
                        {t.name}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-black relative hidden md:block">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-black dark:text-white"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            What Customers Are Saying
          </motion.h2>

          <Swiper
            modules={[Autoplay, EffectCoverflow, Pagination]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 120,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={t.id} style={{ width: 520 }}>
                <motion.div
                  className="bg-white dark:bg-white/90 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition text-black"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 1 }}
                >
                  <div className="flex items-center gap-6">
                    <motion.img
                      src={t.img}
                      alt={t.name}
                      className="w-20 h-20 rounded-full object-cover"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 1 }}
                    />
                    <div>
                      <motion.p
                        className="italic text-gray-700 dark:text-gray-300"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                      >
                        "{t.text}"
                      </motion.p>
                      <motion.p
                        className="mt-3 font-semibold text-black dark:text-white"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                      >
                        {t.name}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-black text-yellow-800 dark:text-yellow-100 py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "AVOBAGS",
              content: (
                <p className="mt-2 text-sm">
                  Premium bags crafted in India. Repair for life.
                </p>
              ),
            },
            {
              title: "Company",
              content: (
                <ul className="mt-2 text-sm space-y-2">
                  <li>About</li>
                  <li>Careers</li>
                  <li>Press</li>
                </ul>
              ),
            },
            {
              title: "Support",
              content: (
                <ul className="mt-2 text-sm space-y-2">
                  <li>Contact</li>
                  <li>Repairs</li>
                  <li>Shipping</li>
                </ul>
              ),
            },
          ].map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 1 }}
            >
              <h4 className="text-black dark:text-white font-bold text-xl">
                {col.title}
              </h4>
              {col.content}
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-8 text-center text-xs text-yellow-700 dark:text-yellow-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          © {new Date().getFullYear()} AVOBAGS — All rights reserved
        </motion.div>
      </footer>
    </div>
  );
}
