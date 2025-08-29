import React, { useState, useMemo, useEffect, useRef } from "react";

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔹 Extract categories
  const categories = useMemo(() => {
    const allCats = allProducts.flatMap((p: any) =>
      p.categories.map((c: any) => c.name)
    );
    return Array.from(new Set(allCats));
  }, [allProducts]);

  const minPrice = useMemo(
    () => Math.min(...allProducts.map((p: any) => Number(p.prices.price))),
    [allProducts]
  );
  const maxPrice = useMemo(
    () => Math.max(...allProducts.map((p: any) => Number(p.prices.price))),
    [allProducts]
  );

  const priceRanges = useMemo(() => {
    const step = Math.ceil((maxPrice - minPrice) / 4);
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

  useEffect(() => {
    let filtered = [...allProducts];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p: any) =>
        p.categories.some((c: any) => selectedCategories.includes(c.name))
      );
    }

    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      filtered = filtered.filter(
        (p) => Number(p.prices.price) >= min && Number(p.prices.price) <= max
      );
    }

    setProductsData(filtered);
  }, [selectedCategories, selectedPriceRange, allProducts, setProductsData]);

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedPriceRange("");
    setProductsData(allProducts);
    resetFilter();
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const hasFilters = selectedCategories.length > 0 || selectedPriceRange;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Filters</h3>
        {hasFilters && (
          <button style={styles.clearBtn} onClick={handleReset}>
            Clear All ✕
          </button>
        )}
      </div>

      {/* Category */}
      <div style={styles.section} ref={dropdownRef}>
        <label style={styles.label}>Categories</label>
        <div
          style={styles.dropdown}
          onClick={() => setOpenDropdown((prev) => !prev)}
        >
          {selectedCategories.length > 0
            ? selectedCategories.join(", ")
            : "Select categories"}
          <span style={styles.dropdownIcon}>▼</span>
        </div>
        {openDropdown && (
          <div style={styles.dropdownMenu}>
            {categories.map((cat, idx) => (
              <label key={idx} style={styles.option}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  style={{ marginRight: "6px" }}
                />
                {cat}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div style={styles.section}>
        <label style={styles.label}>Price Range</label>
        <div style={styles.radioGroup}>
          {priceRanges.map((range, idx) => (
            <label key={idx} style={styles.radioLabel}>
              <input
                type="radio"
                name="priceRange"
                value={`${range.min}-${range.max}`}
                checked={selectedPriceRange === `${range.min}-${range.max}`}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                style={styles.radioInput}
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: any = {
  container: {
    padding: "1.5rem",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    maxWidth: "320px",
    position: "relative",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  title: {
    margin: 0,
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "#333",
  },
  clearBtn: {
    background: "transparent",
    border: "none",
    color: "#ff4d4f",
    cursor: "pointer",
    fontWeight: 500,
  },
  section: {
    marginBottom: "1.2rem",
    position: "relative",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: 500,
    color: "#444",
  },
  dropdown: {
    border: "1px solid #ccc",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    background: "#fff",
    fontSize: "14px",
  },

  dropdownIcon: {
    marginLeft: "auto",
    fontSize: "10px",
    color: "#666",
    pointerEvents: "none",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginTop: "4px",
    padding: "8px",
    maxHeight: "150px",
    overflowY: "auto",
    zIndex: 10,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  option: {
    display: "flex",
    alignItems: "center",
    padding: "4px 6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "14px",
    cursor: "pointer",
  },
  radioInput: {
    accentColor: "#4caf50",
    cursor: "pointer",
  },
};

export default ProductsFilter;
