import { Button } from "@/components/ui/button";


interface NavbarProps {
  onLoginClick?: () => void;
}

const Navbar = ({ onLoginClick }: NavbarProps) => (
  <nav className="bg-[#19486A] shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo on the left, vertically centered */}
        <div className="flex items-center h-full">
          <img
            src="../public/header-logo.svg"
            alt="Seva Sahayog Foundation Logo"
            className="h-12 w-auto"
            style={{ maxHeight: '48px' }}
          />
        </div>
        {onLoginClick && (
          <button
            onClick={onLoginClick}
            className="bg-yellow-400 text-black px-8 py-3 rounded-md font-semibold hover:bg-yellow-500 transition-colors uppercase tracking-wide"
          >
            Login
          </button>
        )}
      </div>
    </div>
  </nav>
);

export default Navbar;