import { useEffect, useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  Activity,
} from "lucide-react";

import {
  getProducts,
  getUsers,
  getCarts,
} from "../services/api";

function Analytics() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [carts, setCarts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [
          productsData,
          usersData,
          cartsData,
        ] = await Promise.all([
          getProducts(),
          getUsers(),
          getCarts(),
        ]);

        setProducts(productsData.products || []);
        setUsers(usersData.users || []);
        setCarts(cartsData.carts || []);
      } catch (error) {
        console.error(
          "Analytics data error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /*
    Filter data according to selected period.
  */
  const filteredCarts = useMemo(() => {
    if (dateRange === "all") {
      return carts;
    }

    const limit = Number(dateRange);

    return carts.slice(0, limit);
  }, [carts, dateRange]);

  /*
    Basic calculations
  */
  const totalRevenue = useMemo(() => {
    return filteredCarts.reduce(
      (total, cart) => total + cart.total,
      0
    );
  }, [filteredCarts]);

  const totalOrders = filteredCarts.length;

  const averageOrderValue =
    totalOrders > 0
      ? totalRevenue / totalOrders
      : 0;

  /*
    Revenue chart data
  */
  const revenueData = useMemo(() => {
    return filteredCarts.map((cart, index) => ({
      name: `Order ${index + 1}`,
      revenue: cart.total,
      orders: 1,
    }));
  }, [filteredCarts]);

  /*
    Category calculations
  */
  const categoryData = useMemo(() => {
    const categories = {};

    products.forEach((product) => {
      const category = product.category;

      if (!categories[category]) {
        categories[category] = 0;
      }

      categories[category] += 1;
    });

    return Object.entries(categories)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [products]);

  /*
    Category colors
  */
  const chartColors = [
    "#6366f1",
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#f43f5e",
  ];

  /*
    Top products
  */
  const topProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }, [products]);

  /*
    Loading state
  */
  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="text-sm font-medium text-slate-500">
            Loading analytics...
          </p>
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
        <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between animate-fade-up">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-slate-600">
                Analytics
              </span>
            </div>

            <h1 className="font-['Manrope'] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Analytics Overview
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Track your business performance and growth.
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
                    ? "bg-slate-900 text-white shadow-lg"
                    : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Revenue */}
          <div
            className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-up"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-transform duration-300 group-hover:scale-110">
                <DollarSign size={21} />
              </div>

              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
                <TrendingUp size={12} />
                12.5%
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Total Revenue
            </p>

            <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
              ${totalRevenue.toLocaleString()}
            </h2>
          </div>

          {/* Orders */}
          <div
            className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                <ShoppingCart size={21} />
              </div>

              <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                <TrendingUp size={12} />
                8.2%
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Total Orders
            </p>

            <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
              {totalOrders.toLocaleString()}
            </h2>
          </div>

          {/* Average order */}
          <div
            className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-transform duration-300 group-hover:scale-110">
                <Activity size={21} />
              </div>

              <span className="flex items-center gap-1 rounded-full bg-purple-50 px-2 py-1 text-xs font-semibold text-purple-600">
                <TrendingUp size={12} />
                5.8%
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Average Order Value
            </p>

            <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
              ${averageOrderValue.toFixed(2)}
            </h2>
          </div>

          {/* Customers */}
          <div
            className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-transform duration-300 group-hover:scale-110">
                <Users size={21} />
              </div>

              <span className="flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
                <TrendingUp size={12} />
                15.8%
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Customers
            </p>

            <h2 className="mt-1 font-['Manrope'] text-2xl font-extrabold text-slate-900">
              {users.length.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="mb-6 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm animate-scale-in">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-['Manrope'] text-lg font-bold text-slate-900">
                Revenue Performance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Revenue generated across orders
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />

              <span className="text-xs font-medium text-slate-500">
                Revenue
              </span>
            </div>
          </div>

          <div className="h-[360px] w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart
                data={revenueData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="analyticsRevenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#6366f1"
                      stopOpacity={0.35}
                    />

                    <stop
                      offset="100%"
                      stopColor="#6366f1"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow:
                      "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                  formatter={(value) => [
                    `$${value}`,
                    "Revenue",
                  ]}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="url(#analyticsRevenueGradient)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Two Charts */}
        <div className="mb-6 grid gap-6 xl:grid-cols-2">
          {/* Category Chart */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm animate-scale-in">
            <div className="mb-6">
              <h2 className="font-['Manrope'] text-lg font-bold text-slate-900">
                Category Performance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Product distribution by category
              </p>
            </div>

            <div className="h-[330px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={categoryData}
                  layout="vertical"
                  margin={{
                    top: 10,
                    right: 20,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#94a3b8",
                      fontSize: 12,
                    }}
                  />

                  <YAxis
                    type="category"
                    dataKey="name"
                    width={90}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#64748b",
                      fontSize: 11,
                    }}
                  />

                  <Tooltip
                    cursor={{
                      fill: "#f8fafc",
                    }}
                    contentStyle={{
                      borderRadius: "12px",
                      border:
                        "1px solid #e2e8f0",
                    }}
                  />

                  <Bar
                    dataKey="value"
                    fill="#6366f1"
                    radius={[
                      0,
                      6,
                      6,
                      0,
                    ]}
                    barSize={24}
                    animationDuration={1200}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm animate-scale-in">
            <div className="mb-2">
              <h2 className="font-['Manrope'] text-lg font-bold text-slate-900">
                Product Distribution
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Share of products across categories
              </p>
            </div>

            <div className="h-[330px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={105}
                    innerRadius={65}
                    paddingAngle={3}
                    animationDuration={1200}
                  >
                    {categoryData.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            chartColors[
                              index %
                                chartColors.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />

                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Analytics */}
        <div className="grid gap-6 xl:grid-cols-2">
          {/* Performance */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
            <div className="mb-6">
              <h2 className="font-['Manrope'] text-lg font-bold text-slate-900">
                Performance Metrics
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Key performance indicators
              </p>
            </div>

            <div className="space-y-6">
              {/* Conversion */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Conversion Rate
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    84%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[84%] rounded-full bg-indigo-500 transition-all duration-1000" />
                </div>
              </div>

              {/* Customer Retention */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Customer Retention
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    72%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[72%] rounded-full bg-emerald-500 transition-all duration-1000" />
                </div>
              </div>

              {/* Product Performance */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Product Performance
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    91%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[91%] rounded-full bg-violet-500 transition-all duration-1000" />
                </div>
              </div>

              {/* Customer Satisfaction */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Customer Satisfaction
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    88%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[88%] rounded-full bg-orange-500 transition-all duration-1000" />
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
            <div className="mb-6">
              <h2 className="font-['Manrope'] text-lg font-bold text-slate-900">
                Top Performing Products
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Products with the highest ratings
              </p>
            </div>

            <div className="space-y-4">
              {topProducts.map(
                (product, index) => (
                  <div
                    key={product.id}
                    className="group flex items-center gap-4 rounded-xl p-2 transition hover:bg-slate-50"
                  >
                    {/* Rank */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                      {index + 1}
                    </div>

                    {/* Image */}
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-12 w-12 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {product.title}
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs text-slate-400">
                          Rating
                        </span>

                        <span className="text-xs font-semibold text-amber-500">
                          ★ {product.rating}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">
                        ${product.price}
                      </p>

                      <div className="mt-1 flex items-center justify-end gap-1 text-xs font-medium text-emerald-600">
                        <ArrowUpRight size={12} />
                        12%
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Insight Banner */}
        <div className="mt-6 overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
                  <TrendingUp size={17} />
                </div>

                <span className="text-sm font-semibold text-indigo-300">
                  Business Insight
                </span>
              </div>

              <h2 className="font-['Manrope'] text-xl font-bold">
                Your business is showing positive growth.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Revenue and customer activity are moving
                upward. Continue monitoring your top
                performing products to identify additional
                growth opportunities.
              </p>
            </div>

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <TrendingUp
                size={28}
                className="text-indigo-300"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
          <p>
            © 2026 Analytics Dashboard. All rights reserved.
          </p>

          <p>
            Analytics powered by DummyJSON
          </p>
        </div>
      </div>
    </main>
  );
}

export default Analytics;