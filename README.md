<h1 align="center">
  👜 <strong>AVO BAGS</strong>
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN%20%7C%20GSAP%20%7C%20Three.js-4caf50?style=for-the-badge" alt="Stack Badge"/>
  <img src="https://img.shields.io/github/repo-size/sujal-1245/AVOBAGS?style=for-the-badge&color=ff6f61" alt="Repo Size"/>
  <img src="https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel" alt="Frontend"/>
</p>

<div align="center" style="margin-top: 30px;">
  <a href="https://www.avobags.com" target="_blank" style="
    background:#ff6f61;
    color:white;
    padding:14px 30px;
    border-radius:12px;
    font-weight:600;
    text-decoration:none;
    display:inline-block;
    margin:5px;
    box-shadow:0 5px 15px rgba(255,111,97,0.4);
  ">🛍️ Visit Live Website</a>

  <a href="https://avobags.vercel.app" target="_blank" style="
    background:#000000;
    color:white;
    padding:14px 30px;
    border-radius:12px;
    font-weight:600;
    text-decoration:none;
    display:inline-block;
    margin:5px;
    box-shadow:0 5px 15px rgba(0,0,0,0.3);
  ">⚡ Open Vercel Preview</a>

  <a href="https://github.com/sujal-1245/AVOBAGS" target="_blank" style="
    background:#4caf50;
    color:white;
    padding:14px 30px;
    border-radius:12px;
    font-weight:600;
    text-decoration:none;
    display:inline-block;
    margin:5px;
    box-shadow:0 5px 15px rgba(76,175,80,0.3);
  ">💻 View GitHub Repo</a>
</div>

---

<h2 align="center">🌍 Overview</h2>

<p align="center" style="max-width:700px; margin:auto;">
<strong>AVO BAGS</strong> is a modern e-commerce website built using the <strong>MERN stack</strong>, enhanced with <strong>GSAP animations</strong> and <strong>Three.js 3D visuals</strong>.  
It delivers a visually immersive shopping experience that blends minimal design, smooth motion, and high-performance 3D rendering.
</p>

---

<h2 align="center">🧠 Tech Stack</h2>

<table align="center">
<tr><td><strong>Frontend</strong></td><td>React.js (Vite) + GSAP + Three.js</td></tr>
<tr><td><strong>Backend</strong></td><td>Node.js + Express.js</td></tr>
<tr><td><strong>Database</strong></td><td>MongoDB Atlas</td></tr>
<tr><td><strong>Animation Engine</strong></td><td>GSAP ScrollTrigger</td></tr>
<tr><td><strong>3D Framework</strong></td><td>Three.js (GLB Model Rendering)</td></tr>
<tr><td><strong>Hosting</strong></td><td>Vercel (Frontend) + Render / Railway (Backend)</td></tr>
</table>

---

<h2 align="center">✨ Key Features</h2>

<ul style="max-width:750px; margin:auto;">
  <li>🧩 <strong>Full MERN stack</strong> — clean separation of frontend and backend for scalability.</li>
  <li>🌀 <strong>GSAP animations</strong> — smooth motion, scroll effects, and cinematic transitions.</li>
  <li>🌐 <strong>Three.js 3D visuals</strong> — integrated 3D models (GLB) rendered interactively.</li>
  <li>🛍️ <strong>Dynamic e-commerce flow</strong> — product listing, cart, and checkout.</li>
  <li>📱 <strong>Responsive layout</strong> — built mobile-first with adaptive design.</li>
  <li>⚡ <strong>Deployed globally</strong> — fast load and CDN-optimized with Vercel.</li>
</ul>

---

<h2 align="center">🖼️ Screenshots</h2>

<p align="center">
  <img src="./frontend/public/screenshots/home.png" width="800" alt="Home Page"/>
  <br/><em>Immersive 3D Hero Section powered by Three.js & GSAP</em>
</p>

<p align="center">
  <img src="./frontend/public/screenshots/product.png" width="800" alt="Product Page"/>
  <br/><em>Minimal product showcase with elegant animations</em>
</p>

<p align="center">
  <img src="./frontend/public/screenshots/cart.png" width="800" alt="Cart Page"/>
  <br/><em>Cart & Checkout Flow with refined visual hierarchy</em>
</p>

---

<h2 align="center">⚙️ Local Setup</h2>

```bash
# 1️⃣ Clone repository
git clone https://github.com/sujal-1245/AVOBAGS.git
cd AVOBAGS

# 2️⃣ Install frontend dependencies
cd frontend
npm install
npm run dev

# 3️⃣ Install backend dependencies
cd ../backend
npm install
npm run dev
````

Create a `.env` file in the backend root:

```env
MONGO_URI=your_mongo_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

---

<h2 align="center">📂 Folder Structure</h2>

```
AVOBAGS/
│
├── frontend/         # React + GSAP + Three.js (UI)
│   ├── src/
│   └── public/
│
├── backend/          # Node + Express + MongoDB (API)
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── server.js
│
└── README.md
```

---

<h2 align="center">🌐 Deployment</h2>

<div align="center" style="margin-top: 20px;">
  <a href="https://vercel.com" target="_blank" style="
    background:#ff6f61;
    color:white;
    padding:12px 26px;
    border-radius:10px;
    font-weight:600;
    text-decoration:none;
    display:inline-block;
    margin:5px;
    box-shadow:0 4px 12px rgba(255,111,97,0.3);
  ">🛒 Deploy Frontend on Vercel</a>

<a href="https://render.com" target="_blank" style="
 background:#4caf50;
 color:white;
 padding:12px 26px;
 border-radius:10px;
 font-weight:600;
 text-decoration:none;
 display:inline-block;
 margin:5px;
 box-shadow:0 4px 12px rgba(76,175,80,0.3);
">⚙️ Deploy Backend on Render</a>

</div>

---

<h2 align="center">🎮 Animation & Interaction</h2>

AVO BAGS uses **GSAP ScrollTrigger** and **Three.js** to create cinematic motion sequences and interactive 3D scenes.

```js
// Example animation
gsap.from(".hero-title", {
  opacity: 0,
  y: 80,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".hero",
    start: "top center",
  },
});
```

The 3D models (`.glb` format) are rendered through Three.js within a custom scene setup.
Animations sync with scroll behavior for seamless depth motion.

---

<h2 align="center">🤝 Contributing</h2>

Contributions are always welcome — bug fixes, UI improvements, or new features.

```bash
git checkout -b feature/your-feature
git commit -m "Add: your amazing feature"
git push origin feature/your-feature
```

Then open a Pull Request 🚀

---

<h2 align="center">👤 Author</h2>

<p align="center">
  <strong>Sujal</strong><br/>
  Computer Science Engineer | MERN Developer | 3D & Animation Enthusiast<br/>
  🌐 <a href="https://www.avobags.com" target="_blank">https://www.avobags.com</a><br/>
</p>

---

<h2 align="center">⭐ Support This Project</h2>

<div align="center">
  <a href="https://github.com/sujal-1245/AVOBAGS" target="_blank" style="
    background:#ffcc00;
    color:black;
    padding:14px 30px;
    border-radius:12px;
    font-weight:700;
    text-decoration:none;
    display:inline-block;
    margin:6px;
    box-shadow:0 5px 12px rgba(255,204,0,0.4);
  ">⭐ Star This Repository</a>
</div>

---

<h3 align="center" style="font-weight:400; margin-top:30px;">
  “AVO BAGS merges code, creativity, and motion — delivering more than just an online store.”
</h3>

<div align="center" style="margin-top:25px;">
  <a href="https://www.avobags.com" target="_blank" style="
    background:#ff6f61;
    color:white;
    padding:16px 36px;
    border-radius:14px;
    font-weight:700;
    text-decoration:none;
    display:inline-block;
    box-shadow:0 6px 20px rgba(255,111,97,0.4);
  ">👜 Explore AVO BAGS</a>
</div>
```

---
