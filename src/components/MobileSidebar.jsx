import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  X,
} from "lucide-react";

function MobileSidebar({
  open,
  activePage,
  onNavigate,
  onClose,
}) {
  if (!open) return null;

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Orders",
      icon: ShoppingCart,
    },
    {
      name: "Products",
      icon: Package,
    },
    {
      name: "Customers",
      icon: Users,
    },
    {
      name: "Analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm md:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 p-5 text-white shadow-2xl md:hidden">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => onNavigate("Dashboard")}
            className="text-left"
          >
            <h1 className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text font-['Manrope'] text-2xl font-extrabold text-transparent">
              Analytics
            </h1>

            <p className="text-sm text-slate-500">
              Admin Dashboard
            </p>
          </button>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              activePage === item.name;

            return (
              <button
                key={item.name}
                onClick={() =>
                  onNavigate(item.name)
                }
                className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white text-slate-900 shadow-lg"
                    : "text-slate-300 hover:translate-x-1 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon
                  size={19}
                  className="transition-transform duration-200 group-hover:scale-110"
                />

                <span>{item.name}</span>

                {item.name === "Analytics" && (
                  <span
                    className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-indigo-500/20 text-indigo-400"
                    }`}
                  >
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={() =>
            alert("Logout functionality coming soon")
          }
          className="absolute bottom-6 left-5 right-5 flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={19} />

          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}

export default MobileSidebar;