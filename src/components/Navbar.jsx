import { Bell, Menu, Search } from "lucide-react";

function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/70 bg-white/90 px-4 backdrop-blur-xl sm:px-6">

      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Search */}
        <div className="hidden items-center gap-3 rounded-xl bg-slate-100 px-4 py-2.5 sm:flex">

          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-40 bg-transparent text-sm outline-none placeholder:text-slate-400 lg:w-64"
          />

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* Mobile search */}
        <button className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 sm:hidden">
          <Search size={20} />
        </button>

        {/* Notification */}
        <button className="relative rounded-xl p-2 text-slate-500 transition hover:bg-slate-100">

          <Bell size={21} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-500" />

        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-semibold text-white shadow-lg shadow-indigo-500/20">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-bold">
              Admin
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;