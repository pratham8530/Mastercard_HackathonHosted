import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Plus, Heart, Box } from "lucide-react";

interface DonorLayoutProps {
  children: ReactNode;
}

const DonorLayout = ({ children }: DonorLayoutProps) => {
  const { pathname } = useLocation();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 bg-[#0F3D56] text-white min-h-screen">
          <div className="h-16 flex items-center px-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <Box className="h-6 w-6 text-yellow-400" />
              <span className="text-lg font-semibold">DonorHub</span>
            </div>
          </div>
          <nav className="mt-4 px-3 space-y-2">
            <Link
              to="/"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/") ? "bg-yellow-500 text-[#0F3D56] font-semibold" : "hover:bg-white/10"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/create"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/create") ? "bg-yellow-500 text-[#0F3D56] font-semibold" : "hover:bg-white/10"
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Create Donation</span>
            </Link>
            <Link
              to="/my-donations"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/my-donations") ? "bg-yellow-500 text-[#0F3D56] font-semibold" : "hover:bg-white/10"
              }`}
            >
              <Heart className="h-4 w-4" />
              <span>My Donations</span>
            </Link>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <div className="px-6 py-6 max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DonorLayout;
