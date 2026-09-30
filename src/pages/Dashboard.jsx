import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react";

function Dashboard() {
  return (
    <main className="p-6">

      {/* Page heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h2>

        <p className="text-slate-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {/* Revenue */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Revenue
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                $24,580
              </h3>
            </div>

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Orders
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                1,245
              </h3>
            </div>

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <ShoppingCart size={24} />
            </div>
          </div>
        </div>

        {/* Customers */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Customers
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                8,420
              </h3>
            </div>

            <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
              <Users size={24} />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Products
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                194
              </h3>
            </div>

            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <Package size={24} />
            </div>
          </div>
        </div>

      </div>

      {/* Chart placeholder */}
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">

        <h3 className="text-lg font-semibold">
          Revenue Overview
        </h3>

        <div className="mt-5 flex h-72 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
          Revenue Chart Coming Soon...
        </div>

      </div>

    </main>
  );
}

export default Dashboard;