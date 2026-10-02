import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MobileSidebar from "./components/MobileSidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile sidebar */}
      <MobileSidebar
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">

        <Navbar
          onMenuClick={() => setMobileMenuOpen(true)}
        />

        <Dashboard />

      </div>

    </div>
  );
}

export default App;