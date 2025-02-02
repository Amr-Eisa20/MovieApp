import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#032541] text-white py-3 px-6 flex items-center justify-between">
      {/* Left Side - Logo and Navigation Links */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-bold text-green-400">
            <img src="/logo.svg" alt="TMDB Logo" className="w-24" />
          </Link>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 text-sm">
          <Link href="#" className="hover:text-gray-300">
            Movies
          </Link>
          <Link href="#" className="hover:text-gray-300">
            TV Shows
          </Link>
          <Link href="#" className="hover:text-gray-300">
            People
          </Link>
          <Link href="#" className="hover:text-gray-300">
            More
          </Link>
        </div>
      </div>

      {/* Right Side - Icons and Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <Plus className="cursor-pointer hover:text-gray-300" />
        <button className="border border-white px-2 py-1 text-sm rounded hover:bg-white hover:text-[#032541]">
          EN
        </button>
        <Link href="#" className="text-sm hover:text-gray-300">
          Login
        </Link>
        <Link href="#" className="text-sm font-bold hover:text-gray-300">
          Join TMDB
        </Link>
        <Search className="cursor-pointer hover:text-gray-300" />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-[#032541] flex flex-col items-center py-4 space-y-4 md:hidden">
          <Link href="#" className="hover:text-gray-300">
            Movies
          </Link>
          <Link href="#" className="hover:text-gray-300">
            TV Shows
          </Link>
          <Link href="#" className="hover:text-gray-300">
            People
          </Link>
          <Link href="#" className="hover:text-gray-300">
            More
          </Link>
          <Plus className="cursor-pointer hover:text-gray-300" />
          <button className="border border-white px-2 py-1 text-sm rounded hover:bg-white hover:text-[#032541]">
            EN
          </button>
          <Link href="#" className="text-sm hover:text-gray-300">
            Login
          </Link>
          <Link href="#" className="text-sm font-bold hover:text-gray-300">
            Join TMDB
          </Link>
          <Search className="cursor-pointer hover:text-gray-300" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
