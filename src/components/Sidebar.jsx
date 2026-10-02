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
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-800 bg-slate-950 p-5 text-white md:block">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text font-['Manrope'] text-2xl font-extrabold text-transparent">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Admin Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          const isActive = index === 0;

          return (
            <button
              key={item.name}
              className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white text-slate-900 shadow-lg shadow-black/10"
                  : "text-slate-400 hover:translate-x-1 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon
                size={19}
                className={`transition-transform duration-200 ${
                  !isActive
                    ? "group-hover:scale-110"
                    : ""
                }`}
              />

              <span>{item.name}</span>

              {item.name === "Analytics" && (
                <span className="ml-auto rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-400">
                  NEW
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-5 w-[calc(16rem-2.5rem)]">
        <div className="mb-4 border-t border-slate-800" />

        <button className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400">
          <LogOut
            size={19}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;