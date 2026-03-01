import { Link, useLocation } from 'react-router';
import { Tent, ShoppingBag } from 'lucide-react';
import { useSections } from '../../context/SectionContext';

export function Header() {
  const location = useLocation();
  const { selectedSections } = useSections();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#1a252f] to-[#2C3E50] border-b border-[#E8D5B5]/20 shadow-xl backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <Tent className="w-8 h-8 text-[#E8D5B5]" />
            <div className="flex flex-col">
              <span className="text-[#E8D5B5] font-bold text-xl leading-tight">CampSite Solutions</span>
              <span className="text-gray-400 text-xs tracking-wide">HOMEPAGE BUILDER</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2 ml-auto">
            <Link
              to="/"
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-[#E8D5B5]/10 text-[#E8D5B5] shadow-inner' 
                  : 'text-gray-300 hover:bg-white/5 hover:text-[#E8D5B5]'
              }`}
            >
              Templates
            </Link>
            <Link
              to="/library"
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                isActive('/library') 
                  ? 'bg-[#E8D5B5]/10 text-[#E8D5B5] shadow-inner' 
                  : 'text-gray-300 hover:bg-white/5 hover:text-[#E8D5B5]'
              }`}
            >
              Section Library
            </Link>
            <Link
              to="/my-layout"
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                isActive('/my-layout') 
                  ? 'bg-[#E8D5B5]/10 text-[#E8D5B5] shadow-inner' 
                  : 'text-gray-300 hover:bg-white/5 hover:text-[#E8D5B5]'
              }`}
            >
              My Layout
              {selectedSections.length > 0 && (
                <span className="bg-[#E8D5B5] text-[#2C3E50] text-xs font-bold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center shadow-md">
                  {selectedSections.length}
                </span>
              )}
            </Link>
            <Link
              to="/review"
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                isActive('/review') 
                  ? 'bg-[#E8D5B5]/10 text-[#E8D5B5] shadow-inner' 
                  : 'text-gray-300 hover:bg-white/5 hover:text-[#E8D5B5]'
              }`}
            >
              Review Board
            </Link>
            <div className="w-px h-8 bg-gray-600 mx-2"></div>
            <Link
              to="/lead"
              className="bg-gradient-to-r from-[#E8D5B5] to-[#d4c19f] text-[#2C3E50] px-7 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#E8D5B5]/20 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </nav>

          <button className="md:hidden p-2 text-gray-300 ml-auto hover:text-[#E8D5B5] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}