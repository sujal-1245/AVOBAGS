export default function Filters({ categories, category, setCategory, filtered }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-2 rounded-full text-sm border ${
                category === c
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-600">Showing {filtered.length} results</div>
      </div>
    </section>
  );
}
