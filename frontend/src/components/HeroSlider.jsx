import { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts";

export default function HeroSlider() {
  const { filtered } = useProducts();
  const showcase = filtered.slice(0, 5); // only first 5 for slider
  const [index, setIndex] = useState(0);

  // Auto slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % showcase.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [showcase.length]);

  if (!showcase.length) return null;

  return (
    <section className="relative w-full bg-cambridge_blue-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 relative overflow-hidden">
        {/* Slider Track */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {showcase.map((p, i) => {
            const reverse = i % 2 === 1; // alternate layout
            return (
              <div key={p.id} className="flex-shrink-0 w-full">
                <div
                  className={`flex flex-col md:flex-row items-center gap-10 px-6 ${
                    reverse ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Text */}
                  <div className="flex-1 pr-4">
                    <h1 className="text-4xl font-bold leading-tight text-dark_slate_gray-500">
                      {p.name}
                    </h1>
                    <p className="mt-4 text-hookers_green-600 max-w-xl">
                      {p.desc}
                    </p>
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() =>
                          window.scrollTo({ top: 700, behavior: "smooth" })
                        }
                        className="px-5 py-3 bg-hookers_green-500 text-ash_gray-900 rounded-lg shadow-lg hover:bg-hookers_green-400 transition"
                      >
                        Shop Now – ${p.price}
                      </button>
                      <button
                        onClick={() =>
                          alert("Contact sales: hi@AVOBAGS.example — demo only.")
                        }
                        className="px-5 py-3 bg-cambridge_blue-500 text-dark_slate_gray-100 border border-cambridge_blue-400 rounded-lg shadow-md hover:bg-cambridge_blue-400 transition"
                      >
                        Contact Sales
                      </button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex-1 pl-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-96 object-cover rounded-2xl shadow-xl border-4 border-dark_slate_gray-400 transform -translate-x-4"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots Indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {showcase.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === index ? "bg-charcoal-500" : "bg-cambridge_blue-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
