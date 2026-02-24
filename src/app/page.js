"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchCategories, fetchProducts } from "../lib/products";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("none"); // none | price-asc | price-desc
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const [p, c] = await Promise.all([fetchProducts(), fetchCategories()]);

        setProducts(p);
        setCategories(["all", ...c]);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // category filter
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    // search filter (title)
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    // sort
    if (sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, category, search, sort]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  }, [filteredProducts.length, itemsPerPage]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, page, itemsPerPage]);

  useEffect(() => {
    // If filters reduce results, keep page valid
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  function getPageNumbers(current, total) {
    const delta = 2; // how many pages around current
    const range = [];
    const rangeWithDots = [];
    let last;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (last) {
        if (i - last === 2) {
          rangeWithDots.push(last + 1);
        } else if (i - last > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      last = i;
    }

    return rangeWithDots;
  }

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold">Fake Store Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Products with filtering and pagination
        </p>
        {loading && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}
        {error && <p className="mt-8 text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            {/* Controls */}
            <div className="mt-8 bg-white border rounded-xl p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setPage(1);
                    }}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Search
                  </label>
                  <input
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>

                {/* Sort */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Sort
                  </label>
                  <select
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="none">None</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                  </select>
                </div>

                {/* Items per page */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Per page
                  </label>
                  <select
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setPage(1);
                    }}
                  >
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                    <option value={16}>16</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  onClick={() => {
                    setCategory("all");
                    setSearch("");
                    setSort("none");
                    setItemsPerPage(8);
                    setPage(1);
                  }}
                >
                  Clear Filters
                </button>

                <div className="text-sm text-gray-600">
                  Page <span className="font-medium">{page}</span> of{" "}
                  <span className="font-medium">{totalPages}</span>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-medium">{paginatedProducts.length}</span>{" "}
                of{" "}
                <span className="font-medium">{filteredProducts.length}</span>{" "}
                products
              </p>

              {filteredProducts.length === 0 ? (
                <div className="mt-6 border rounded-xl bg-white p-10 text-center">
                  <h3 className="text-lg font-semibold">No products found</h3>
                  <p className="text-gray-600 mt-2">
                    Try changing category, clearing search, or resetting
                    filters.
                  </p>
                  <button
                    className="mt-4 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    onClick={() => {
                      setCategory("all");
                      setSearch("");
                      setSort("none");
                      setItemsPerPage(8);
                      setPage(1);
                    }}
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {paginatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  className="px-3 py-2 border rounded-lg disabled:opacity-50"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Prev
                </button>
                {getPageNumbers(page, totalPages).map((item, idx) => {
                  if (item === "...") {
                    return (
                      <span
                        key={`dots-${idx}`}
                        className="px-3 py-2 text-gray-500"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={item}
                      className={`px-3 py-2 border rounded-lg ${
                        item === page ? "bg-gray-900 text-white" : "bg-white"
                      }`}
                      onClick={() => setPage(item)}
                    >
                      {item}
                    </button>
                  );
                })}

                <button
                  className="px-3 py-2 border rounded-lg disabled:opacity-50"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
