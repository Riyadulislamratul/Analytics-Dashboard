import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">

      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Analytics
        </h1>

        <p className="text-sm text-slate-400">
          Admin Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">

        <a
          href="#"
          className="flex items-center gap-3 rounded-lg bg-slate-800 px-4 py-3"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </a>

        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800"
        >
          <ShoppingCart size={20} />
          Orders
        </a>

        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800"
        >
          <Package size={20} />
          Products
        </a>

        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800"
        >
          <Users size={20} />
          Customers
        </a>

        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800"
        >
          <BarChart3 size={20} />
          Analytics
        </a>

        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800"
        >
          <Settings size={20} />
          Settings
        </a>

      </nav>

      {/* Logout */}
      <div className="mt-10">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800">
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;