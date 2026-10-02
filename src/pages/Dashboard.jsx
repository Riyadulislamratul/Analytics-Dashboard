import { useEffect, useMemo, useState } from "react";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

import AnimatedNumber from "../components/AnimatedNumber";
import RevenueChart from "../components/RevenueChart";
import CategoryChart from "../components/CategoryChart";
import TopProducts from "../components/TopProducts";
import RecentOrders from "../components/RecentOrders";

import {
  getProducts,
  getUsers,
  getCarts,
} from "../services/api";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [carts, setCarts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [dateRange, setDateRange] = useState("30");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [productsData, usersData, cartsData] =
        await Promise.all([
          getProducts(),
          getUsers(),
          getCarts(),
        ]);

      setProducts(productsData.products || []);
      setUsers(usersData.users || []);
      setCarts(cartsData.carts || []);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to load dashboard data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const filteredCarts = useMemo(() => {
    if (dateRange === "all") {
      return carts;
    }

    const limit = Number(dateRange);

    return carts.slice(0, limit);
  }, [carts, dateRange]);

  const totalRevenue = useMemo(() => {
    return filteredCarts.reduce(
      (total, cart) => total + cart.total,
      0
    );
  }, [filteredCarts]);

  const totalOrders = filteredCarts.length;

  const totalCustomers = users.length;

  const totalProducts = products.length;

  const stats = [
    {
      title: "Total Revenue",
      value: totalRevenue,
      prefix: "$",
      icon: DollarSign,
      iconStyle: "bg-emerald-50 text-emerald-600",
      change: "12.5%",
      changeStyle: "text-emerald-600",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      iconStyle: "bg-blue-50 text-blue-600",
      change: "8.2%",
      changeStyle: "text-blue-600",
    },
    {
      title: "Customers",
      value: totalCustomers,
      icon: Users,
      iconStyle: "bg-purple-50 text-purple-600",
      change: "15.8%",
      changeStyle: "text-purple-600",
    },
    {
      title: "Products",
      value: totalProducts,
      icon: Package,
      iconStyle: "bg-orange-50 text-orange-600",
      change: "4.6%",
      changeStyle: "text-orange-600",
    },
  ];

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="text-sm font-medium text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </main>
    );
  }

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
            onClick={fetchDashboardData}
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
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-indigo-500/5 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-violet-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between animate-fade-up">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-slate-600">
                Overview
              </span>
            </div>

            <h1 className="font-['Manrope'] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Good evening, Admin 👋
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Here's what's happening with your business today.
            </p>
          </div>

          {/* Date Filter */}
          <div className="flex flex-wrap gap-2">
            {[
              {
                label: "7 Days",
                value: "7",
              },
              {
                label: "30 Days",
                value: "30",
              },
              {
                label: "90 Days",
                value: "90",
              },
              {
                label: "All Time",
                value: "all",
              },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  setDateRange(option.value)
                }
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  dateRange === option.value
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                    : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 animate-fade-up"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${stat.iconStyle}`}
                  >
                    <Icon size={21} />
                  </div>

                  <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
                    <TrendingUp size={12} />
                    {stat.change}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold tracking-tight text-slate-900">
                    <AnimatedNumber
                      value={stat.value}
                      prefix={stat.prefix || ""}
                    />
                  </h2>
                </div>

                <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      index === 0
                        ? "w-[78%] bg-emerald-500"
                        : index === 1
                        ? "w-[65%] bg-blue-500"
                        : index === 2
                        ? "w-[84%] bg-purple-500"
                        : "w-[58%] bg-orange-500"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Charts */}
        <div className="mb-6 grid gap-6 xl:grid-cols-3">
          {/* Revenue Chart */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md xl:col-span-2 animate-scale-in">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-['Manrope'] text-lg font-bold text-slate-900">
                  Revenue Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Revenue performance over the selected period
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />

                <span className="text-xs font-medium text-slate-500">
                  Revenue
                </span>
              </div>
            </div>

            <RevenueChart carts={filteredCarts} />
          </div>

          {/* Category Chart */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md animate-scale-in">
            <div className="mb-6">
              <h2 className="font-['Manrope'] text-lg font-bold text-slate-900">
                Category Performance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Products by category
              </p>
            </div>

            <CategoryChart products={products} />
          </div>
        </div>

        {/* Products + Orders */}
        <div className="grid gap-6 xl:grid-cols-2">
          {/* Top Products */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md animate-fade-up">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-['Manrope'] text-lg font-bold text-slate-900">
                  Top Products
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Highest rated products
                </p>
              </div>

              <button className="rounded-lg px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50">
                View All
              </button>
            </div>

            <TopProducts products={products} />
          </div>

          {/* Recent Orders */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md animate-fade-up">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-['Manrope'] text-lg font-bold text-slate-900">
                  Recent Orders
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest customer orders
                </p>
              </div>

              <button className="rounded-lg px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50">
                View All
              </button>
            </div>

            <RecentOrders carts={filteredCarts} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
          <p>
            © 2026 Analytics Dashboard. All rights reserved.
          </p>

          <p>
            Data powered by DummyJSON
          </p>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;