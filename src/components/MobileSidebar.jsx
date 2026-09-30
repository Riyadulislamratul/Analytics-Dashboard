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

function MobileSidebar({ open, onClose }) {
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

          <div>
            <h1 className="font-['Manrope'] text-2xl font-extrabold">
              Analytics
            </h1>

            <p className="text-sm text-slate-400">
              Admin Dashboard
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>

        </div>

        {/* Navigation */}
        <nav className="space-y-2">

          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={onClose}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-all duration-200 hover:translate-x-1 hover:bg-slate-800 ${
                  index === 0
                    ? "bg-white text-slate-900 hover:bg-white"
                    : "text-slate-300"
                }`}
              >
                <Icon size={19} />
                {item.name}
              </button>
            );
          })}

        </nav>

        {/* Logout */}
        <button className="absolute bottom-6 left-5 right-5 flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white">
          <LogOut size={19} />
          Logout
        </button>

      </aside>
    </>
  );
}

export default MobileSidebar;