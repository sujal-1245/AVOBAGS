<h1 align="center">
  👜 <strong>AVO BAGS</strong>
</h1>

<p align="center">
  <a href="https://www.avobags.com">
    <img src="https://img.shields.io/badge/%20Visit%20Live%20Website-ff6f61?style=for-the-badge&logo=google-chrome&logoColor=white" />
  </a>
  <a href="https://avobags.vercel.app">
    <img src="https://img.shields.io/badge/%20Open%20Vercel%20Preview-000000?style=for-the-badge&logo=vercel" />
  </a>
  <a href="https://github.com/sujal-1245/AVOBAGS">
    <img src="https://img.shields.io/badge/%20View%20GitHub%20Repo-4caf50?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN%20%7C%20GSAP%20%7C%20Three.js-4caf50?style=for-the-badge" />
  <img src="https://img.shields.io/github/repo-size/sujal-1245/AVOBAGS?color=ff6f61&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel" />
</p>

---

## 🌍 Overview

**AVO BAGS** is a full-stack e-commerce website built with the **MERN** stack — MongoDB, Express, React, and Node — enhanced by **GSAP** for cinematic motion and **Three.js** for interactive 3D visuals.  
It demonstrates how a modern store can merge art direction, motion design, and real-time rendering into a clean, commercial web experience.

---

## 🧠 Tech Stack

| Layer | Technology | Description |
|-------|-------------|-------------|
| **Frontend** | React.js (Vite) | Modular, high-performance interface |
| **Animation** | GSAP + ScrollTrigger | Scroll-based transitions & dynamic motion |
| **3D Rendering** | Three.js | WebGL-powered 3D model visualization |
| **Backend** | Node.js + Express | RESTful API and routing |
| **Database** | MongoDB Atlas | Scalable NoSQL cloud database |
| **Deployment** | Vercel + Render | Seamless frontend + backend hosting |

---

## ✨ Features

- 🧩 Full MERN architecture — fast, modular, and scalable  
- 🌀 GSAP motion engine — smooth animation and parallax scroll effects  
- 🌐 Three.js integration — realistic 3D product models in browser  
- 🛍️ E-commerce flow — product browsing, cart, and checkout  
- 📱 Fully responsive — optimized for every device  
- ⚡ Deployed globally via CDN on Vercel  

---

## 🖼️ Screenshots

| Home / Hero | Product Page | Cart & Checkout |
|:------------:|:-------------:|:---------------:|
| ![Home Screenshot](./frontend/public/screenshots/home.png) | ![Product Screenshot](./frontend/public/screenshots/product.png) | ![Cart Screenshot](./frontend/public/screenshots/cart.png) |

> *(Tip: capture high-resolution screenshots at 1440×900 and store in `frontend/public/screenshots/`)*

---

## ⚙️ Local Setup

```bash
# 1️⃣ Clone the repository
git clone https://github.com/sujal-1245/AVOBAGS.git
cd AVOBAGS

# 2️⃣ Setup frontend
cd frontend
npm install
npm run dev

# 3️⃣ Setup backend
cd ../backend
npm install
npm run dev
````

Create a `.env` file in `/backend`:

```env
MONGO_URI=your_mongo_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

---

## 📂 Folder Structure

```
AVOBAGS/
│
├── frontend/       # React + Three.js + GSAP
│   ├── public/
│   └── src/
│
├── backend/        # Node + Express + MongoDB
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
└── README.md
```

---

## 🌐 Deployment

<p align="center">
  <a href="https://vercel.com" target="_blank">
    <img src="https://img.shields.io/badge/%20Frontend%20on%20Vercel-ff6f61?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
  <a href="https://render.com" target="_blank">
    <img src="https://img.shields.io/badge/%20Backend%20on%20Render-4caf50?style=for-the-badge&logo=render&logoColor=white" />
  </a>
</p>

---

## 🎮 Animation Logic

**GSAP + ScrollTrigger** drives the micro-interactions and section transitions.
**Three.js** handles 3D scenes rendered as `.glb` models for immersive visuals.

```js
// GSAP ScrollTrigger example
gsap.from(".hero-title", {
  opacity: 0,
  y: 60,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".hero",
    start: "top center",
  },
});
```

---

## 🤝 Contributing

Contributions, bug fixes, or creative ideas are welcome.

```bash
git checkout -b feature/your-feature
git commit -m "Add: cool new feature"
git push origin feature/your-feature
```

Then open a Pull Request 🚀

---

## 👤 Author

**Sujal**
Computer Science Engineer • MERN Developer 

---

## ⭐ Support

<p align="center">
  <a href="https://github.com/sujal-1245/AVOBAGS">
    <img src="https://img.shields.io/badge/%20Star%20This%20Repository-FFD700?style=for-the-badge&logo=github&logoColor=black" />
  </a>
</p>

---

> “AVO BAGS merges engineering, motion, and design — proving that web experiences can feel alive.”

<p align="center">
  <a href="https://www.avobags.com">
    <img src="https://img.shields.io/badge/%20Explore%20AVO%20BAGS-ff6f61?style=for-the-badge&logo=google-chrome&logoColor=white" />
  </a>
</p>



