import { useMemo, useState } from "react";
import PRODUCTS from "../data/products";

export default function useProducts() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const categories = useMemo(() => ["All", ...new Set(PRODUCTS.map((p) => p.category))], []);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.desc.toLowerCase().includes(query.toLowerCase()))
    );
    if (sort === "price-asc") list = list.slice().sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = list.slice().sort((a, b) => b.price - a.price);
    return list;
  }, [query, category, sort]);

  return { query, setQuery, category, setCategory, sort, setSort, categories, filtered };
}
