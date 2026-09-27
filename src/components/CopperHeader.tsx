import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingBag,
  User,
  Factory,
  Flame,
  Menu as MenuIcon,
  X,
  ChevronDown,
  Sparkles,
  Package,
  Layers,
  ChevronRight,
  Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { MainProductSection, PoojaSubCategory } from '../types';

export type ActiveAppView =
  | 'home'
  | 'catalog'
  | 'about'
  | 'services'
  | 'portfolio'
  | 'blog'
  | 'ai-assistant'
  | 'tracking'
  | 'factory-batch'
  | 'admin';

interface CopperHeaderProps {
  activeView: ActiveAppView;
  onSelectView: (view: ActiveAppView) => void;
  onSelectCategory?: (section: MainProductSection, subCat?: PoojaSubCategory) => void;
  onSearch?: (query: string) => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  hasActiveOrder?: boolean;
}

export const CopperHeader: React.FC<CopperHeaderProps> = ({
  activeView,
  onSelectView,
  onSelectCategory,
  onSearch,
  onOpenCart,
  onOpenAuth,
  hasActiveOrder = false
}) => {
  const { firebaseUser, profile, logout } = useAuth();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAdmin = profile?.role === 'admin';

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (section: MainProductSection, subCat: PoojaSubCategory = 'All') => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory(section, subCat);
    } else {
      onSelectView('catalog');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      onSelectView('catalog');
    }
  };

  const poojaSubCategories: PoojaSubCategory[] = [
    'Aggarbatti',
    'Dhoop Batti',
    'Dhoop',
    'Mala',
    'Copper Products',
    'Others'
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#1F1914] border-b-2 border-amber-600/40 text-amber-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            onClick={() => onSelectView('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-wide text-amber-200 group-hover:text-amber-400 transition-colors">
                  BHAVNA POOJA CENTER
                </span>
              </div>
              <p className="text-[10px] text-stone-400 tracking-wider">
                Authentic Copper Yantras & Ritual Essentials
              </p>
            </div>
          </div>

          {/* Desktop Navigation Bar */}
          <nav className="hidden md:flex items-center gap-2 bg-stone-900/80 px-4 py-1.5 rounded-full border border-stone-800">
            <button
              onClick={() => onSelectView('home')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeView === 'home'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-black shadow-md'
                  : 'text-stone-300 hover:text-amber-300 hover:bg-stone-800'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onSelectView('about')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeView === 'about'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-black shadow-md'
                  : 'text-stone-300 hover:text-amber-300 hover:bg-stone-800'
              }`}
            >
              About Us
            </button>

            {/* Products Dropdown Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeView === 'catalog'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-black shadow-md'
                    : 'text-stone-300 hover:text-amber-300 hover:bg-stone-800'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Products Floating Dropdown Menu */}
              {dropdownOpen && (
                <div
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="absolute left-0 mt-2 w-72 bg-stone-900 border border-amber-600/40 text-stone-100 rounded-2xl shadow-2xl p-3 z-50 animate-fadeIn space-y-3"
                >
                  <button
                    onClick={() => handleCategoryClick('All')}
                    className="w-full text-left p-2 rounded-xl hover:bg-stone-800 text-xs font-bold text-amber-300 flex items-center justify-between transition-colors border-b border-stone-800"
                  >
                    <span>Browse All Products</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Section 1: Copper Yantra */}
                  <div className="space-y-1">
                    <button
                      onClick={() => handleCategoryClick('Copper Yantra')}
                      className="w-full text-left p-2 rounded-xl hover:bg-amber-950/60 text-amber-200 font-serif font-bold text-xs flex items-center gap-2 transition-colors border border-amber-600/20"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Copper Yantra</span>
                    </button>
                  </div>

                  {/* Section 2: Pooja Products with Sub-Categories */}
                  <div className="space-y-1 pt-1 border-t border-stone-800">
                    <div
                      onClick={() => handleCategoryClick('Pooja Products', 'All')}
                      className="p-2 text-xs font-bold text-amber-300 flex items-center gap-2 cursor-pointer hover:bg-stone-800 rounded-xl"
                    >
                      <Package className="w-4 h-4 text-amber-400" />
                      <span>Pooja Products</span>
                    </div>

                    <div className="pl-4 space-y-1 border-l-2 border-stone-800 ml-3">
                      {poojaSubCategories.map((subCat) => (
                        <button
                          key={subCat}
                          onClick={() => handleCategoryClick('Pooja Products', subCat)}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium text-stone-300 hover:text-amber-300 hover:bg-stone-800 flex items-center justify-between transition-colors"
                        >
                          <span>{subCat}</span>
                          <ChevronRight className="w-3 h-3 text-stone-500" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Section: Search Bar, Cart & Login */}
          <div className="flex items-center gap-3">
            {/* Search Bar Before Cart */}
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (onSearch) onSearch(e.target.value);
                }}
                placeholder="Search products..."
                className="bg-stone-900 border border-stone-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 w-36 sm:w-44 transition-all font-medium"
              />
            </form>

            {/* Admin Shortcut for Admins */}
            {isAdmin && (
              <button
                onClick={() => onSelectView('admin')}
                className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border bg-stone-900 text-amber-400 border-amber-600/30 hover:border-amber-500/60 transition-all font-bold"
                title="Admin Dashboard & Factory Logs"
              >
                <Factory className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-stone-800 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors relative"
              title="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="bg-amber-500 text-stone-950 text-[10px] font-black px-1.5 py-0.2 rounded-full border border-stone-950">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Login / Profile Button */}
            {firebaseUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectView('tracking')}
                  className="hidden sm:flex items-center gap-1.5 bg-stone-900 text-amber-200 border border-stone-800 px-3 py-1.5 rounded-xl text-xs font-bold hover:text-amber-400 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span className="truncate max-w-[90px]">
                    {profile?.name?.split(' ')[0] || firebaseUser.email?.split('@')[0]}
                  </span>
                </button>
                <button
                  onClick={logout}
                  className="text-xs text-stone-400 hover:text-rose-400 bg-stone-900 px-2.5 py-1.5 rounded-xl border border-stone-800 font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 text-xs font-bold bg-amber-600 hover:bg-amber-500 text-stone-950 px-3.5 py-1.5 rounded-xl transition-colors shadow"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-300 hover:text-amber-400 bg-stone-900 rounded-lg border border-stone-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-950 border-b border-stone-800 px-4 py-4 space-y-3">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
              placeholder="Search products..."
              className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-8 pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </form>

          <button
            onClick={() => {
              onSelectView('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2 rounded-lg text-sm font-bold text-stone-200 hover:bg-stone-900"
          >
            Home
          </button>

          <button
            onClick={() => {
              onSelectView('about');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2 rounded-lg text-sm font-bold text-stone-200 hover:bg-stone-900"
          >
            About Us
          </button>

          <div className="space-y-1 pt-2 border-t border-stone-800">
            <span className="text-xs font-bold text-amber-400 px-4 block">Products Categories:</span>
            <button
              onClick={() => handleCategoryClick('Copper Yantra')}
              className="w-full text-left px-6 py-2 text-xs font-bold text-amber-200 hover:bg-stone-900 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Copper Yantra</span>
            </button>

            <button
              onClick={() => handleCategoryClick('Pooja Products', 'All')}
              className="w-full text-left px-6 py-2 text-xs font-bold text-amber-300 hover:bg-stone-900 flex items-center gap-2"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Pooja Products (All)</span>
            </button>

            {poojaSubCategories.map((subCat) => (
              <button
                key={subCat}
                onClick={() => handleCategoryClick('Pooja Products', subCat)}
                className="w-full text-left px-8 py-1.5 text-xs text-stone-300 hover:text-amber-300 hover:bg-stone-900"
              >
                • {subCat}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
