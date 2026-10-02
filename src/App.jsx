import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MobileSidebar from "./components/MobileSidebar";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;

      case "Orders":
        return <Orders />;

      case "Products":
        return <Products />;

      case "Customers":
        return <Customers />;

      case "Analytics":
        return <Analytics />;

      case "Settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigation}
      />

      {/* Mobile Sidebar */}
      <MobileSidebar
        open={mobileMenuOpen}
        activePage={activePage}
        onNavigate={handleNavigation}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          onMenuClick={() => setMobileMenuOpen(true)}
        />

        {renderPage()}
      </div>
    </div>
  );
}

export default App;