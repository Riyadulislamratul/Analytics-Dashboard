import { useEffect, useMemo, useState } from "react";

import {
  Search,
  ShoppingCart,
  CheckCircle2,
  Clock3,
  DollarSign,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { getCarts } from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 6;

  /*
   * Fetch orders
   */
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCarts();

      const formattedOrders = (
        data.carts || []
      ).map((cart, index) => ({
        ...cart,
        status:
          index % 5 === 0
            ? "Pending"
            : "Completed",
      }));

      setOrders(formattedOrders);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /*
   * Filter orders
   */
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id
          .toString()
          .includes(searchTerm) ||
        `Order #${order.id}`
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "all" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [
    orders,
    searchTerm,
    statusFilter,
  ]);

  /*
   * Pagination
   */
  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  const startIndex =
    (currentPage - 1) * ordersPerPage;

  const endIndex =
    startIndex + ordersPerPage;

  const paginatedOrders =
    filteredOrders.slice(
      startIndex,
      endIndex
    );

  /*
   * Reset pagination when filters change
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  /*
   * Statistics
   */
  const totalOrders = orders.length;

  const completedOrders = orders.filter(
    (order) =>
      order.status === "Completed"
  ).length;

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "Pending"
  ).length;

  const totalRevenue = orders.reduce(
    (total, order) =>
      total + order.total,
    0
  );

  /*
   * Loading state
   */
  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="text-sm font-medium text-slate-500">
            Loading orders...
          </p>
        </div>
      </main>
    );
  }

  /*
   * Error state
   */
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
            onClick={fetchOrders}
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
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-slate-600">
              Orders
            </span>
          </div>

          <h1 className="font-['Manrope'] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Orders
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage and monitor your customer orders.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total */}
          <div className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-up">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                <ShoppingCart size={21} />
              </div>

              <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                Orders
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Total Orders
            </p>

            <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
              {totalOrders}
            </h2>
          </div>

          {/* Completed */}
          <div
            className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-up"
            style={{
              animationDelay: "100ms",
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-transform duration-300 group-hover:scale-110">
                <CheckCircle2 size={21} />
              </div>

              <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
                Completed
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Completed Orders
            </p>

            <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
              {completedOrders}
            </h2>
          </div>

          {/* Pending */}
          <div
            className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-up"
            style={{
              animationDelay: "200ms",
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-transform duration-300 group-hover:scale-110">
                <Clock3 size={21} />
              </div>

              <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-600">
                Pending
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Pending Orders
            </p>

            <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
              {pendingOrders}
            </h2>
          </div>

          {/* Revenue */}
          <div
            className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-up"
            style={{
              animationDelay: "300ms",
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-transform duration-300 group-hover:scale-110">
                <DollarSign size={21} />
              </div>

              <span className="rounded-full bg-purple-50 px-2 py-1 text-xs font-semibold text-purple-600">
                Revenue
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Total Revenue
            </p>

            <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
              ${totalRevenue.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                placeholder="Search by order ID..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              {[
                {
                  label: "All Orders",
                  value: "all",
                },
                {
                  label: "Completed",
                  value: "Completed",
                },
                {
                  label: "Pending",
                  value: "Pending",
                },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() =>
                    setStatusFilter(
                      option.value
                    )
                  }
                  className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    statusFilter ===
                    option.value
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm animate-scale-in">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-['Manrope'] text-lg font-bold text-slate-900">
                Order List
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Showing{" "}
                {filteredOrders.length}{" "}
                orders
              </p>
            </div>

            <button
              onClick={fetchOrders}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {paginatedOrders.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Search size={24} />
              </div>

              <h3 className="mt-4 font-['Manrope'] text-lg font-bold text-slate-800">
                No orders found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-400">
                      <th className="px-6 py-4 font-medium">
                        Order
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Products
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Quantity
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Total
                      </th>

                      <th className="px-6 py-4 text-right font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedOrders.map(
                      (order) => (
                        <tr
                          key={order.id}
                          className="border-b border-slate-50 transition hover:bg-slate-50"
                        >
                          {/* Order */}
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <ShoppingCart
                                  size={17}
                                />
                              </div>

                              <div>
                                <p className="font-semibold text-slate-800">
                                  #
                                  {order.id
                                    .toString()
                                    .padStart(
                                      4,
                                      "0"
                                    )}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-400">
                                  Order ID
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Products */}
                          <td className="px-6 py-5">
                            <span className="text-sm font-medium text-slate-600">
                              {
                                order.totalProducts
                              }{" "}
                              products
                            </span>
                          </td>

                          {/* Quantity */}
                          <td className="px-6 py-5">
                            <span className="text-sm text-slate-500">
                              {
                                order.totalQuantity
                              }{" "}
                              items
                            </span>
                          </td>

                          {/* Total */}
                          <td className="px-6 py-5">
                            <span className="font-semibold text-slate-800">
                              $
                              {order.total.toLocaleString()}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-5">
                            <div className="flex justify-end">
                              {order.status ===
                              "Completed" ? (
                                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                                  <CheckCircle2
                                    size={14}
                                  />
                                  Completed
                                </span>
                              ) : (
                                <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600">
                                  <Clock3
                                    size={14}
                                  />
                                  Pending
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
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
                      filteredOrders.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-700">
                    {filteredOrders.length}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          page - 1
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft
                      size={17}
                    />
                  </button>

                  <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-slate-900 px-3 text-sm font-semibold text-white">
                    {currentPage}
                  </span>

                  <button
                    disabled={
                      currentPage >=
                      totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          page + 1
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight
                      size={17}
                    />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
          <p>
            © 2026 Analytics Dashboard. All rights reserved.
          </p>

          <p>
            Orders powered by DummyJSON
          </p>
        </div>
      </div>
    </main>
  );
}

export default Orders;