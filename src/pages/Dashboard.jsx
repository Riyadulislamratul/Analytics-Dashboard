import { useEffect, useState } from "react";

import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
} from "lucide-react";

import AnimatedNumber from "../components/AnimatedNumber";

import {
  getProducts,
  getUsers,
  getCarts,
} from "../services/api";
import RevenueChart from "../components/RevenueChart";
import CategoryChart from "../components/CategoryChart";
import TopProducts from "../components/TopProducts";
import RecentOrders from "../components/RecentOrders";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [carts, setCarts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        const [productsData, usersData, cartsData] =
          await Promise.all([
            getProducts(),
            getUsers(),
            getCarts(),
          ]);

        setProducts(productsData.products);
        setUsers(usersData.users);
        setCarts(cartsData.carts);

      } catch (error) {
        console.error(error);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  /*
    Calculate dashboard statistics
  */

  const totalRevenue = carts.reduce(
    (total, cart) => total + cart.total,
    0
  );

  const totalOrders = carts.length;

  const totalCustomers = users.length;

  const totalProducts = products.length;

  const stats = [
    {
      title: "Total Revenue",
      value: totalRevenue,
      prefix: "$",
      icon: DollarSign,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },

    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      iconStyle: "bg-blue-50 text-blue-600",
    },

    {
      title: "Customers",
      value: totalCustomers,
      icon: Users,
      iconStyle: "bg-purple-50 text-purple-600",
    },

    {
      title: "Products",
      value: totalProducts,
      icon: Package,
      iconStyle: "bg-orange-50 text-orange-600",
    },
  ];

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <div className="text-center">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

          <p className="text-sm text-slate-500">
            Loading dashboard...
          </p>

        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-1 items-center justify-center">

        <div className="rounded-xl bg-red-50 px-6 py-5 text-center text-red-600">
          {error}
        </div>

      </main>
    );
  }

  return (
    <main className="flex-1 p-6 lg:p-8">

      {/* Heading */}

      <div className="animate-fade-up mb-8">

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-slate-900">
            Overview
          </span>
        </div>

        <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
          Good evening, Admin 👋
        </h2>

        <p className="mt-2 text-slate-500">
          Here's what's happening with your business today.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat, index) => {

          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="animate-fade-up group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <h3 className="mt-3 text-3xl font-extrabold tracking-tight">
                    <AnimatedNumber
                      value={stat.value}
                      prefix={stat.prefix}
                    />
                  </h3>

                </div>

                <div
                  className={`rounded-xl p-3 transition-transform duration-300 group-hover:scale-110 ${stat.iconStyle}`}
                >
                  <Icon size={22} />
                </div>

              </div>

              <div className="mt-4 flex items-center gap-1 text-sm text-emerald-600">

                <TrendingUp size={16} />

                <span className="font-medium">
                  12.5%
                </span>

                <span className="text-slate-400">
                  vs last month
                </span>

              </div>

            </div>
          );
        })}

      </div>

      {/* Charts */}

<div className="mt-6 grid gap-6 xl:grid-cols-3">

  {/* Revenue */}

  <div
    className="animate-fade-up rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm xl:col-span-2"
    style={{
      animationDelay: "400ms",
    }}
  >

    <div className="mb-5 flex items-center justify-between">

      <div>
        <h3 className="text-lg font-bold">
          Revenue Overview
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Revenue generated from recent orders
        </p>
      </div>

      <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none">
        <option>Recent Orders</option>
        <option>All Orders</option>
      </select>

    </div>

    <RevenueChart carts={carts} />

  </div>


  {/* Category */}

  <div
    className="animate-fade-up rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm"
    style={{
      animationDelay: "500ms",
    }}
  >

    <div className="mb-5">

      <h3 className="text-lg font-bold">
        Products by Category
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Product distribution
      </p>

    </div>

    <CategoryChart products={products} />

  </div>

</div>


{/* Products + Orders */}

<div className="mt-6 grid gap-6 xl:grid-cols-2">

  {/* Top Products */}

  <div
    className="animate-fade-up rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm"
    style={{
      animationDelay: "600ms",
    }}
  >

    <div className="mb-5">

      <h3 className="text-lg font-bold">
        Top Products
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Highest rated products
      </p>

    </div>

    <TopProducts products={products} />

  </div>


  {/* Recent Orders */}

  <div
    className="animate-fade-up rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm"
    style={{
      animationDelay: "700ms",
    }}
  >

    <div className="mb-5">

      <h3 className="text-lg font-bold">
        Recent Orders
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Latest transactions
      </p>

    </div>

    <RecentOrders carts={carts} />

  </div>

</div>

    </main>
  );
}

export default Dashboard;