import { Bell, Search } from "lucide-react";

function Navbar() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">

      {/* Search */}
      <div className="flex items-center gap-3 rounded-lg bg-slate-100 px-4 py-2">
        <Search size={20} className="text-slate-500" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">

        <button className="text-slate-600">
          <Bell size={22} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
            A
          </div>

          <div>
            <p className="font-semibold">Admin</p>
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