import React, {
  useRef,
  useEffect,
  Suspense,
  useState,
  forwardRef,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie from "lottie-web";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import SuitcaseLottie from "../components/SuitcaseLottie";

gsap.registerPlugin(ScrollTrigger);

const MODEL_PATH = "/assets/low-poly_suitcase.glb";

/* ======================================================
   ModelGLB (auto-scale + centered)
====================================================== */
const ModelGLB = forwardRef(
  (
    {
      src = MODEL_PATH,
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      scale = 1,
      maxVH = 0.35,
    },
    ref
  ) => {
    const gltf = useGLTF(src);
    const [computedScale, setComputedScale] = useState(scale);

    useEffect(() => {
      if (!gltf?.scene) return;
      const scene = gltf.scene;
      scene.scale.setScalar(1);
      scene.position.set(0, 0, 0);
      scene.updateMatrixWorld(true);

      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const modelHeight = size.y || Math.max(size.x, size.z) || 1;
      const maxDim = Math.max(size.x, size.y, size.z) || 1;

      const fov = 50 * (Math.PI / 180);
      const cameraDistance = 6.5;
      const viewportHeightAtDist = 2 * Math.tan(fov / 2) * cameraDistance;
      const desiredWorldHeight = viewportHeightAtDist * maxVH;
      const referenceDim = modelHeight > 0 ? modelHeight : maxDim;
      const baseScale = (desiredWorldHeight / referenceDim) * scale;
      setComputedScale(baseScale);

      box.setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.set(-center.x, -center.y + 0.02, -center.z);
    }, [gltf, scale, maxVH]);

    return (
      <group
        ref={ref}
        position={position}
        rotation={rotation}
        scale={[computedScale, computedScale, computedScale]}
        dispose={null}
      >
        {gltf && <primitive object={gltf.scene} />}
      </group>
    );
  }
);

useGLTF.preload && useGLTF.preload(MODEL_PATH);

/* ======================================================
   Floating Shapes
====================================================== */
function FloatingShapes({ count = 30, color = "white" }) {
  const meshRef = useRef();
  const dummy = new THREE.Object3D();

  useEffect(() => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 6;
      dummy.position.set(x, y, z);
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const s = Math.random() * 0.9 + 0.1;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [count]);

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.0006;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <icosahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.6}
        transparent
        opacity={0.65}
      />
    </instancedMesh>
  );
}

/* ======================================================
   Hero3D — cinematic entry + scroll
====================================================== */
function Hero3D({ isDark }) {
  const modelRef = useRef();
  const controlsRef = useRef();
  const scrollProgress = useRef(0); // 0 = top, 1 = bottom

  // Update scroll progress
  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => (scrollProgress.current = self.progress),
      scrub: true,
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  useFrame(() => {
    if (!modelRef.current) return;
    const t = scrollProgress.current;

    // Rotate along Y and X based on scroll
    modelRef.current.rotation.y = t * Math.PI * 2; // 0 → 360deg
    modelRef.current.rotation.x = t * -0.3; // 0 → -0.3 rad

    // Scale based on scroll
    const scale = 0.3 + t * 0.3; // 0.3 → 0.6
    modelRef.current.scale.set(scale, scale, scale);
  });

  return (
    <>
      <ambientLight intensity={isDark ? 1.05 : 1.2} />
      <directionalLight intensity={isDark ? 1.6 : 1.2} position={[5, 5, 5]} />
      <directionalLight intensity={0.6} position={[-5, 3, 5]} />
      <hemisphereLight
        skyColor={isDark ? 0xffffff : 0x000000}
        groundColor={isDark ? 0x111111 : 0xffffff}
        intensity={0.25}
      />

      <Suspense fallback={<Html center>...</Html>}>
        <color attach="background" args={[isDark ? "#000" : "#fff"]} />
        <perspectiveCamera makeDefault position={[0.6, 0.35, 5.0]} fov={50} />
        <ModelGLB
          ref={modelRef}
          src={MODEL_PATH}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={0.6}
        />
        <Environment preset="studio" />
        <FloatingShapes count={24} color={isDark ? "black" : "black/50"} />
      </Suspense>

      <OrbitControls
  ref={controlsRef}
  enableZoom={false}
  enablePan={false}
  enableRotate={false}
  enabled={typeof window !== "undefined" && window.innerWidth > 768}
/>

    </>
  );
}

/* ======================================================
   Lottie Anim
====================================================== */
function LottieAnim({ containerId, path, className }) {
  useEffect(() => {
    const el = document.getElementById(containerId);
    if (!el) return;
    const anim = lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path,
    });
    return () => anim.destroy();
  }, [containerId, path]);

  return <div id={containerId} className={className} />;
}

/* ======================================================
   Section (fade-in)
====================================================== */
function Section({ children, className = "", id }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      }
    );
  }, []);
  return (
    <section
      id={id}
      ref={ref}
      className={`py-24 px-6 md:px-16 lg:px-32 ${className}`}
    >
      {children}
    </section>
  );
}

/* ======================================================
   Landing Page
====================================================== */
export default function LandingPage() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    // Sync initial theme from localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setIsDark(storedTheme === "dark");

    // Listen for theme changes (from Navbar)
    const handleThemeChange = (e) => setIsDark(e.detail === "dark");
    window.addEventListener("themeChanged", handleThemeChange);

    return () => window.removeEventListener("themeChanged", handleThemeChange);
  }, []);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "+=700",
      pin: true,
      pinSpacing: true,
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? "text-white bg-gradient-to-b from-black via-zinc-800 to-black"
          : "text-black bg-gradient-to-b from-white via-gray-200 to-white"
      }`}
    >
      {/* <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${
          isDark ? "bg-black/30" : "bg-white/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-semibold text-lg tracking-wide">AVOBAGS</div>
          <nav className="space-x-6 hidden md:flex">
            <a href="#" className="text-sm opacity-80 hover:opacity-100">
              Shop
            </a>
            <a href="#" className="text-sm opacity-80 hover:opacity-100">
              Features
            </a>
            <a href="#" className="text-sm opacity-80 hover:opacity-100">
              Stories
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full border border-white/20 hover:opacity-80 transition"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className={`text-sm px-3 py-2 border rounded-md ${
                isDark ? "border-white/20" : "border-black/20"
              }`}
            >
              Sign in
            </button>
            <button
              className={`text-sm px-4 py-2 rounded-md font-semibold ${
                isDark ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              Buy
            </button>
          </div>
        </div>
      </header> */}

      <main>
        {/* HERO */}
        <motion.div
          className="hero relative h-screen flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Canvas
  camera={{ position: [0.6, 0.35, 5.0], fov: 50 }}
  gl={{ antialias: true }}
  className="w-full h-screen"
  style={{
    touchAction: "pan-y",
    pointerEvents: window.innerWidth <= 768 ? "none" : "auto",
  }}
>
  <Hero3D isDark={isDark} />
</Canvas>


          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-20 px-6">
            <div className="max-w-3xl text-center hero-text">
              <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.9]">
                AVOBAGS
              </h1>
              <p className="mt-6 text-lg md:text-xl opacity-80">
                Ultra-premium luggage — designed with craft, engineered for
                life.
              </p>
              <div className="mt-8 flex gap-4 justify-center">
                <button
                  className={`px-6 py-3 rounded-full font-bold shadow-2xl ${
                    isDark ? "bg-white text-black" : "bg-black text-white"
                  }`}
                >
                  Shop the Drop
                </button>
                <button
                  className={`px-6 py-3 rounded-full border ${
                    isDark ? "border-white/30" : "border-black/30"
                  }`}
                >
                  Explore Materials
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* LOTTIE */}
        <Section
          id="bag-animations"
          className={
            isDark
              ? "bg-gradient-to-b from-black/80 to-black"
              : "bg-gradient-to-b from-white to-gray-100"
          }
        >
          <motion.div
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.3, once: false }} // 👈 replays every time
          >
            {/* Suitcase Animation on top */}
            <div className="col-span-full flex gap-5 justify-center mb-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`rounded-2xl p-6 flex items-center justify-center ${
                    isDark ? "bg-white/5" : "bg-black/5"
                  }`}
                  whileHover={{
                    rotateX: 8,
                    rotateY: -8,
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 200 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{ transformStyle: "preserve-3d" }}
                />
              ))}
            </div>

            {/* Text about bags */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ amount: 0.3, once: false }} // 👈 replays every time
            >
              <SuitcaseLottie path="/assets/Mala Andando.json" />
              <h2 className="text-4xl font-bold">Bags that make a statement</h2>
              <p className="mt-4 text-lg opacity-80">
                Discover our premium collection of bags — crafted for style,
                comfort, and durability.
              </p>
            </motion.div>

            {/* Bag images */}
            <div className="grid grid-cols-2 gap-6">
              {[
                "/assets/yellow post.heic",
                "/assets/greenbg_graybag.jpg",
                "/assets/blackbag.jpg",
                "/assets/redbag.heic",
              ].map((path, i) => (
                <motion.div
                  key={i}
                  className={`rounded-2xl p-6 flex items-center justify-center ${
                    isDark ? "bg-white/5" : "bg-black/5"
                  }`}
                  whileHover={{
                    rotateX: 8,
                    rotateY: -8,
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 200 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ amount: 0.3, once: false }} // 👈 replays every time
                >
                  <motion.img
                    src={path}
                    alt={`bag ${i + 1}`}
                    className="w-48 h-48 object-cover rounded-md shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 250 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* SHOWCASE */}
        {/* <Section id="showcase" className={isDark ? "bg-black" : "bg-white"}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black p-6">
              <Canvas camera={{ position: [0, 0, 4.5], fov: 48 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={0.9} />
                <Suspense fallback={null}>
                  <ModelGLB
                    src={"/assets/stylized_suitcase.glb"}
                    position={[0, -0.6, 0]}
                    scale={0.9}
                    rotation={[0.05, -0.7, 0]}
                  />
                </Suspense>
              </Canvas>
            </div>
            <div>
              <h3 className="text-3xl font-bold">Design Details</h3>
              <p className="mt-4 opacity-80">
                From hinge geometry to handle ergonomics — every detail is
                purposeful. Intersections of craftsmanship and computational
                design.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  "Leather sourced responsibly",
                  "Low-poly shell optimization",
                  "Studio-tested form factor",
                  "Magnetic latch durability",
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg ${
                      isDark ? "bg-white/5" : "bg-black/5"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section> */}

        {/* FOOTER */}
        {/* <footer className="py-16">
          <div className="max-w-7xl mx-auto text-center opacity-70">
            © AVOBAGS — Crafted 2025
          </div>
        </footer> */}
      </main>
    </div>
  );
}
