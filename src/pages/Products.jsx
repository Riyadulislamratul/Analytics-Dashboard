
import { useEffect, useMemo, useState } from "react";

import {
  Search,
  Package,
  Star,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  SlidersHorizontal,
} from "lucide-react";

import { getProducts } from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productsPerPage = 8;

  // ---------------------------------------
  // Fetch Products
  // ---------------------------------------

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(data.products || []);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ---------------------------------------
  // Categories
  // ---------------------------------------

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];

    return uniqueCategories.sort();
  }, [products]);

  // ---------------------------------------
  // Filter + Search + Sort
  // ---------------------------------------

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        product.title.toLowerCase().includes(search) ||
        product.brand?.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search);

      const matchesCategory =
        categoryFilter === "all" ||
        product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    // Sorting
    if (sortOption === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortOption === "stock") {
      result.sort((a, b) => b.stock - a.stock);
    }

    if (sortOption === "name") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [
    products,
    searchTerm,
    categoryFilter,
    sortOption,
  ]);

  // ---------------------------------------
  // Pagination
  // ---------------------------------------

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const endIndex =
    startIndex + productsPerPage;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    endIndex
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, sortOption]);

  // ---------------------------------------
  // Statistics
  // ---------------------------------------

  const totalProducts = products.length;

  const lowStockProducts = products.filter(
    (product) => product.stock > 0 && product.stock <= 10
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0
  ).length;

  const averageRating =
    products.length > 0
      ? (
          products.reduce(
            (total, product) =>
              total + product.rating,
            0
          ) / products.length
        ).toFixed(1)
      : "0.0";

  // ---------------------------------------
  // Loading State
  // ---------------------------------------

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="text-sm font-medium text-slate-500">
            Loading products...
          </p>
        </div>
      </main>
    );
  }

  // ---------------------------------------
  // Error State
  // ---------------------------------------

  if (error) {
    return (
      <main className="flex flex-1 items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            <RefreshCw size={22} />
          </div>

          <h2 className="font-['Manrope'] text-xl font-bold text-slate-900">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>

          <button
            onClick={fetchProducts}
            className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex-1 overflow-hidden bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Background decoration */}

      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-indigo-500/5 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-violet-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1600px]">

        {/* ---------------------------------------
            Header
        --------------------------------------- */}

        <div className="mb-8 animate-fade-up">
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
            <span>Dashboard</span>

            <span>/</span>

            <span className="text-slate-600">
              Products
            </span>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-['Manrope'] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Products
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage your product inventory and monitor
                product performance.
              </p>
            </div>

            <button
              onClick={fetchProducts}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
            >
              <RefreshCw size={16} />

              Refresh
            </button>
          </div>
        </div>

        {/* ---------------------------------------
            Statistics
        --------------------------------------- */}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Total Products */}

          <div className="group animate-fade-up rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-transform duration-300 group-hover:scale-110">
                <Package size={21} />
              </div>

              <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
                Products
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Total Products
            </p>

            <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
              {totalProducts}
            </h2>
          </div>

          {/* Low Stock */}

          <div
            className="group animate-fade-up rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-transform duration-300 group-hover:scale-110">
                <Package size={21} />
              </div>

              <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-600">
                Attention
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Low Stock
            </p>

            <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
              {lowStockProducts}
            </h2>
          </div>

          {/* Out of Stock */}

          <div
            className="group animate-fade-up rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-transform duration-300 group-hover:scale-110">
                <Package size={21} />
              </div>

              <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                Critical
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Out of Stock
            </p>

            <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
              {outOfStockProducts}
            </h2>
          </div>

          {/* Average Rating */}

          <div
            className="group animate-fade-up rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-500 transition-transform duration-300 group-hover:scale-110">
                <Star
                  size={21}
                  className="fill-yellow-400"
                />
              </div>

              <span className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600">
                <Star
                  size={11}
                  className="fill-yellow-400"
                />

                Rating
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Average Rating
            </p>

            <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
              {averageRating}
              <span className="ml-1 text-sm font-medium text-slate-400">
                / 5
              </span>
            </h2>
          </div>
        </div>

        {/* ---------------------------------------
            Filters
        --------------------------------------- */}

        <div className="mb-6 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            {/* Search */}

            <div className="relative w-full xl:max-w-md">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search products, brands or categories..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              {/* Category */}

              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  size={17}
                  className="hidden text-slate-400 sm:block"
                />

                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 outline-none transition focus:border-indigo-400 focus:bg-white sm:w-52"
                >
                  <option value="all">
                    All Categories
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}

              <select
                value={sortOption}
                onChange={(event) =>
                  setSortOption(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 outline-none transition focus:border-indigo-400 focus:bg-white sm:w-52"
              >
                <option value="default">
                  Sort: Default
                </option>

                <option value="name">
                  Name: A-Z
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Highest Rating
                </option>

                <option value="stock">
                  Highest Stock
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* ---------------------------------------
            Product Table
        --------------------------------------- */}

        <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm animate-scale-in">

          <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-['Manrope'] text-lg font-bold text-slate-900">
                Product Inventory
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Showing {filteredProducts.length} products
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
              {products.length} total products
            </div>
          </div>

          {paginatedProducts.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Search size={24} />
              </div>

              <h3 className="mt-4 font-['Manrope'] text-lg font-bold text-slate-800">
                No products found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setSortOption("default");
                }}
                className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px]">

                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-400">

                      <th className="px-6 py-4 font-medium">
                        Product
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Category
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Price
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Rating
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Stock
                      </th>

                      <th className="px-6 py-4 text-right font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedProducts.map((product) => {

                      const isOutOfStock =
                        product.stock === 0;

                      const isLowStock =
                        product.stock > 0 &&
                        product.stock <= 10;

                      return (
                        <tr
                          key={product.id}
                          className="border-b border-slate-50 transition hover:bg-slate-50"
                        >

                          {/* Product */}

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">

                              <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="h-12 w-12 shrink-0 rounded-xl border border-slate-100 object-cover"
                              />

                              <div className="min-w-0">
                                <p className="max-w-[260px] truncate font-semibold text-slate-800">
                                  {product.title}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                  {product.brand ||
                                    "Generic Brand"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Category */}

                          <td className="px-6 py-5">
                            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold capitalize text-slate-600">
                              {product.category}
                            </span>
                          </td>

                          {/* Price */}

                          <td className="px-6 py-5">
                            <div>
                              <span className="font-semibold text-slate-800">
                                $
                                {product.price.toLocaleString()}
                              </span>

                              {product.discountPercentage > 0 && (
                                <p className="mt-1 text-xs font-medium text-emerald-500">
                                  {product.discountPercentage.toFixed(
                                    0
                                  )}
                                  % off
                                </p>
                              )}
                            </div>
                          </td>

                          {/* Rating */}

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-1.5">
                              <Star
                                size={15}
                                className="fill-yellow-400 text-yellow-400"
                              />

                              <span className="font-semibold text-slate-700">
                                {product.rating}
                              </span>
                            </div>
                          </td>

                          {/* Stock */}

                          <td className="px-6 py-5">
                            {isOutOfStock ? (
                              <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                                Out of stock
                              </span>
                            ) : isLowStock ? (
                              <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600">
                                {product.stock} left
                              </span>
                            ) : (
                              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                                {product.stock} in stock
                              </span>
                            )}
                          </td>

                          {/* Action */}

                          <td className="px-6 py-5">
                            <div className="flex justify-end">
                              <button
                                onClick={() =>
                                  setSelectedProduct(product)
                                }
                                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                              >
                                <Eye size={15} />

                                View
                              </button>
                            </div>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* ---------------------------------------
                  Pagination
              --------------------------------------- */}

              <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-700">
                    {startIndex + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-slate-700">
                    {Math.min(
                      endIndex,
                      filteredProducts.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-700">
                    {filteredProducts.length}
                  </span>
                </p>

                <div className="flex items-center gap-2">

                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage(
                        (page) => page - 1
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-slate-900 px-3 text-sm font-semibold text-white">
                    {currentPage}
                  </span>

                  <button
                    disabled={
                      currentPage >= totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) => page + 1
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={17} />
                  </button>

                </div>
              </div>
            </>
          )}
        </div>

        {/* ---------------------------------------
            Footer
        --------------------------------------- */}

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
          <p>
            © 2026 Analytics Dashboard. All rights
            reserved.
          </p>

          <p>
            Products powered by DummyJSON
          </p>
        </div>
      </div>

      {/* ---------------------------------------
          Product Details Modal
      --------------------------------------- */}

      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl animate-scale-in"
          >

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                  Product Details
                </p>

                <h2 className="mt-1 font-['Manrope'] text-xl font-extrabold text-slate-900">
                  {selectedProduct.title}
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedProduct(null)
                }
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}

            <div className="p-5 sm:p-6">

              <div className="grid gap-6 md:grid-cols-2">

                {/* Image */}

                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                  <img
                    src={selectedProduct.thumbnail}
                    alt={selectedProduct.title}
                    className="h-64 w-full object-cover"
                  />
                </div>

                {/* Information */}

                <div className="space-y-5">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Brand
                    </p>

                    <p className="mt-1 font-semibold text-slate-800">
                      {selectedProduct.brand ||
                        "Generic Brand"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Category
                    </p>

                    <p className="mt-1 capitalize font-semibold text-slate-800">
                      {selectedProduct.category}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Price
                    </p>

                    <p className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
                      ${selectedProduct.price}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-400">
                        Rating
                      </p>

                      <div className="mt-1 flex items-center gap-1">
                        <Star
                          size={15}
                          className="fill-yellow-400 text-yellow-400"
                        />

                        <span className="font-bold text-slate-800">
                          {selectedProduct.rating}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-400">
                        Stock
                      </p>

                      <p className="mt-1 font-bold text-slate-800">
                        {selectedProduct.stock}
                      </p>
                    </div>

                  </div>
                </div>
              </div>

              {/* Description */}

              <div className="mt-6 border-t border-slate-100 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Description
                </p>

                <p className="mt-2 text-sm leading-7 text-slate-500">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Product Details */}

              <div className="mt-6 grid gap-3 sm:grid-cols-3">

                <div className="rounded-xl bg-indigo-50 p-4">
                  <p className="text-xs text-indigo-400">
                    Discount
                  </p>

                  <p className="mt-1 font-bold text-indigo-700">
                    {selectedProduct.discountPercentage.toFixed(
                      1
                    )}
                    %
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="text-xs text-emerald-500">
                    Minimum Order
                  </p>

                  <p className="mt-1 font-bold text-emerald-700">
                    {selectedProduct.minimumOrderQuantity}
                  </p>
                </div>

                <div className="rounded-xl bg-violet-50 p-4">
                  <p className="text-xs text-violet-500">
                    Product ID
                  </p>

                  <p className="mt-1 font-bold text-violet-700">
                    #{selectedProduct.id}
                  </p>
                </div>

              </div>
            </div>

            {/* Modal Footer */}

            <div className="flex justify-end border-t border-slate-100 bg-slate-50 p-5">
              <button
                onClick={() =>
                  setSelectedProduct(null)
                }
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Products;

