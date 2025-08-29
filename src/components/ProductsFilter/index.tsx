import React, { useState, useMemo, useEffect } from "react";

const ProductsFilter = ({
  productsData,
  setProductsData,
  resetFilter,
}: {
  productsData: any;
  setProductsData: any;
  resetFilter: () => void;
}) => {
  const [allProducts] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");

  // 🔹 Extract categories
  const categories = useMemo(() => {
    const allCats = allProducts.flatMap((p: any) =>
      p.categories.map((c: any) => c.name)
    );
    return Array.from(new Set(allCats));
  }, [allProducts]);

  // 🔹 Min & Max price
  const minPrice = useMemo(
    () => Math.min(...allProducts.map((p: any) => Number(p.prices.price))),
    [allProducts]
  );
  const maxPrice = useMemo(
    () => Math.max(...allProducts.map((p: any) => Number(p.prices.price))),
    [allProducts]
  );

  // 🔹 Define some fixed ranges (you can adjust step size)
  const priceRanges = useMemo(() => {
    const step = Math.ceil((maxPrice - minPrice) / 4); // 4 buckets
    const ranges: { label: string; min: number; max: number }[] = [];
    let start = minPrice;
    while (start < maxPrice) {
      const end = Math.min(start + step, maxPrice);
      ranges.push({
        label: `₹${start} - ₹${end}`,
        min: start,
        max: end,
      });
      start = end + 1;
    }
    return ranges;
  }, [minPrice, maxPrice]);

  // 🔹 Filtering logic
  useEffect(() => {
    let filtered = [...allProducts];

    if (selectedCategory) {
      filtered = filtered.filter((p: any) =>
        p.categories.some((c: any) => c.name === selectedCategory)
      );
    }

    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      filtered = filtered.filter(
        (p) => Number(p.prices.price) >= min && Number(p.prices.price) <= max
      );
    }

    setProductsData(filtered);
  }, [selectedCategory, selectedPriceRange, allProducts, setProductsData]);

  // 🔹 Reset filters handler
  const handleReset = () => {
    setSelectedCategory("");
    setSelectedPriceRange("");
    setProductsData(allProducts);
    resetFilter();
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #ddd" }}>
      <h3>Filters</h3>

      {/* Category Filter */}
      <div style={{ marginBottom: "1rem" }}>
        <label>Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((cat: any, idx: number) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Price Filter (Radio buttons) */}
      <div style={{ marginBottom: "1rem" }}>
        <label>Price Range:</label>
        <div>
          {priceRanges.map((range, idx) => (
            <label key={idx} style={{ display: "block" }}>
              <input
                type="radio"
                name="priceRange"
                value={`${range.min}-${range.max}`}
                checked={selectedPriceRange === `${range.min}-${range.max}`}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button onClick={handleReset} style={{ marginTop: "0.5rem" }}>
        Remove Filters
      </button>
    </div>
  );
};

export default ProductsFilter;
