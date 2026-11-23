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
  Search,
  Sun,
  Moon
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
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const CopperHeader: React.FC<CopperHeaderProps> = ({
  activeView,
  onSelectView,
  onSelectCategory,
  onSearch,
  onOpenCart,
  onOpenAuth,
  hasActiveOrder = false,
  isDarkMode = true,
  onToggleDarkMode
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
    <header className={`sticky top-0 z-40 border-b-2 shadow-lg transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#1F1914] border-amber-600/40 text-amber-50' 
        : 'bg-white/95 border-amber-500/50 text-stone-900 shadow-md backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            onClick={() => onSelectView('home')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-serif text-sm sm:text-base md:text-lg font-bold tracking-wide transition-colors ${
                  isDarkMode ? 'text-amber-200 group-hover:text-amber-400' : 'text-amber-800 group-hover:text-amber-600'
                }`}>
                  BHAVNA POOJA CENTER
                </span>
              </div>
              <p className={`text-[9px] sm:text-[10px] tracking-wider truncate max-w-[160px] sm:max-w-none ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                Authentic Copper Yantras & Ritual Essentials
              </p>
            </div>
          </div>

          {/* Desktop Navigation Bar */}
          <nav className={`hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border ${
            isDarkMode ? 'bg-stone-900/80 border-stone-800' : 'bg-amber-50 border-amber-200 shadow-inner'
          }`}>
            <button
              onClick={() => onSelectView('home')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeView === 'home'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold shadow-md'
                  : isDarkMode ? 'text-stone-300 hover:text-amber-300 hover:bg-stone-800' : 'text-stone-700 hover:text-amber-800 hover:bg-amber-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onSelectView('about')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeView === 'about'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold shadow-md'
                  : isDarkMode ? 'text-stone-300 hover:text-amber-300 hover:bg-stone-800' : 'text-stone-700 hover:text-amber-800 hover:bg-amber-100'
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
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold shadow-md'
                    : isDarkMode ? 'text-stone-300 hover:text-amber-300 hover:bg-stone-800' : 'text-stone-700 hover:text-amber-800 hover:bg-amber-100'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Products Floating Dropdown Menu */}
              {dropdownOpen && (
                <div
                  onMouseLeave={() => setDropdownOpen(false)}
                  className={`absolute left-0 mt-2 w-72 rounded-2xl shadow-2xl p-3 z-50 animate-fadeIn space-y-3 border ${
                    isDarkMode ? 'bg-stone-900 border-amber-600/40 text-stone-100' : 'bg-white border-amber-300 text-stone-900'
                  }`}
                >
                  <button
                    onClick={() => handleCategoryClick('All')}
                    className={`w-full text-left p-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors border-b ${
                      isDarkMode ? 'hover:bg-stone-800 text-amber-300 border-stone-800' : 'hover:bg-amber-50 text-amber-800 border-amber-100'
                    }`}
                  >
                    <span>Browse All Products</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Section 1: Copper Yantra */}
                  <div className="space-y-1">
                    <button
                      onClick={() => handleCategoryClick('Copper Yantra')}
                      className={`w-full text-left p-2 rounded-xl font-serif font-bold text-xs flex items-center gap-2 transition-colors border ${
                        isDarkMode ? 'hover:bg-amber-950/60 text-amber-200 border-amber-600/20' : 'hover:bg-amber-100/70 text-amber-900 border-amber-300/40'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Copper Yantra</span>
                    </button>
                  </div>

                  {/* Section 2: Pooja Products with Sub-Categories */}
                  <div className={`space-y-1 pt-1 border-t ${isDarkMode ? 'border-stone-800' : 'border-amber-100'}`}>
                    <div
                      onClick={() => handleCategoryClick('Pooja Products', 'All')}
                      className={`p-2 text-xs font-bold flex items-center gap-2 cursor-pointer rounded-xl ${
                        isDarkMode ? 'text-amber-300 hover:bg-stone-800' : 'text-amber-800 hover:bg-amber-50'
                      }`}
                    >
                      <Package className="w-4 h-4 text-amber-500" />
                      <span>Pooja Products</span>
                    </div>

                    <div className={`pl-4 space-y-1 border-l-2 ml-3 ${isDarkMode ? 'border-stone-800' : 'border-amber-200'}`}>
                      {poojaSubCategories.map((subCat) => (
                        <button
                          key={subCat}
                          onClick={() => handleCategoryClick('Pooja Products', subCat)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium flex items-center justify-between transition-colors ${
                            isDarkMode ? 'text-stone-300 hover:text-amber-300 hover:bg-stone-800' : 'text-stone-700 hover:text-amber-900 hover:bg-amber-100'
                          }`}
                        >
                          <span>{subCat}</span>
                          <ChevronRight className="w-3 h-3 text-stone-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Section: Search Bar, Dark/Light Mode Toggle, Cart & Login */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            {/* Search Bar Before Cart */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (onSearch) onSearch(e.target.value);
                }}
                placeholder="Search products..."
                className={`border rounded-xl pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-amber-500 w-36 sm:w-44 transition-all font-medium ${
                  isDarkMode 
                    ? 'bg-stone-900 border-stone-800 text-stone-200 placeholder-stone-500' 
                    : 'bg-stone-100 border-amber-200 text-stone-900 placeholder-stone-400'
                }`}
              />
            </form>

            {/* Dark Mode / Light Mode Toggle Button */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className={`flex items-center gap-1.5 border p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-sm ${
                  isDarkMode
                    ? 'bg-stone-900 border-stone-800 text-amber-300 hover:text-amber-200'
                    : 'bg-amber-100 border-amber-300 text-stone-900 hover:bg-amber-200'
                }`}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="hidden sm:inline text-[11px]">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-amber-800" />
                    <span className="hidden sm:inline text-[11px]">Dark Mode</span>
                  </>
                )}
              </button>
            )}

            {/* Admin Shortcut for Admins */}
            {isAdmin && (
              <button
                onClick={() => onSelectView('admin')}
                className={`hidden lg:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border font-bold transition-all shadow-sm ${
                  isDarkMode
                    ? 'bg-stone-900 text-amber-400 border-amber-600/30 hover:border-amber-500/60'
                    : 'bg-white hover:bg-amber-50 text-amber-900 border-amber-300'
                }`}
                title="Admin Dashboard & Factory Logs"
              >
                <Factory className={`w-3.5 h-3.5 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                <span>Admin Portal</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className={`flex items-center gap-1.5 sm:gap-2 border p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold transition-colors relative ${
                isDarkMode 
                  ? 'bg-stone-900 hover:bg-stone-800 text-amber-300 border-stone-800' 
                  : 'bg-white hover:bg-amber-50 text-amber-900 border-amber-300 shadow-sm'
              }`}
              title="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full border ${
                  isDarkMode
                    ? 'bg-amber-500 text-stone-950 border-stone-950'
                    : 'bg-amber-500 text-white border-amber-600'
                }`}>
                  {itemCount}
                </span>
              )}
            </button>

            {/* Login / Profile Button */}
            {firebaseUser ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => onSelectView('tracking')}
                  className={`hidden sm:flex items-center gap-1.5 border px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shadow-sm ${
                    isDarkMode
                      ? 'bg-stone-900 text-amber-200 border-stone-800 hover:text-amber-400'
                      : 'bg-white hover:bg-amber-50 text-amber-900 border-amber-300'
                  }`}
                  title="My Orders & Tracking"
                >
                  <User className={`w-3.5 h-3.5 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                  <span className="truncate max-w-[80px]">
                    {profile?.name?.split(' ')[0] || firebaseUser.email?.split('@')[0]}
                  </span>
                </button>
                <button
                  onClick={logout}
                  className={`text-xs px-2 sm:px-2.5 py-1.5 rounded-xl border font-semibold transition-colors shadow-sm ${
                    isDarkMode
                      ? 'bg-stone-900 text-stone-400 hover:text-rose-400 border-stone-800'
                      : 'bg-white hover:bg-rose-50 text-stone-700 hover:text-rose-600 border-amber-300'
                  }`}
                  title="Sign Out"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white px-2.5 sm:px-3.5 py-1.5 rounded-xl transition-colors shadow shrink-0"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl border transition-colors ${
                isDarkMode 
                  ? 'text-stone-300 hover:text-amber-400 bg-stone-900 border-stone-800' 
                  : 'text-stone-700 hover:text-amber-800 bg-amber-50 border-amber-200 shadow-sm'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 py-4 space-y-3 transition-colors ${
          isDarkMode 
            ? 'bg-stone-950/98 border-stone-800 text-stone-200' 
            : 'bg-white border-amber-200 text-stone-900 shadow-xl'
        }`}>
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
              placeholder="Search products..."
              className={`w-full border rounded-xl pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-amber-500 ${
                isDarkMode 
                  ? 'bg-stone-900 border-stone-800 text-stone-200 placeholder-stone-500' 
                  : 'bg-stone-50 border-amber-200 text-stone-900 placeholder-stone-400'
              }`}
            />
          </form>

          <button
            onClick={() => {
              onSelectView('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeView === 'home'
                ? 'bg-amber-600 text-white font-bold'
                : isDarkMode ? 'text-stone-200 hover:bg-stone-900' : 'text-stone-800 hover:bg-amber-50'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => {
              onSelectView('about');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeView === 'about'
                ? 'bg-amber-600 text-white font-bold'
                : isDarkMode ? 'text-stone-200 hover:bg-stone-900' : 'text-stone-800 hover:bg-amber-50'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => {
              onSelectView('catalog');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeView === 'catalog'
                ? 'bg-amber-600 text-white font-bold'
                : isDarkMode ? 'text-stone-200 hover:bg-stone-900' : 'text-stone-800 hover:bg-amber-50'
            }`}
          >
            Browse Catalog
          </button>

          {/* Admin shortcut in mobile menu if admin */}
          {isAdmin && (
            <button
              onClick={() => {
                onSelectView('admin');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold border flex items-center gap-2 transition-colors ${
                isDarkMode
                  ? 'bg-amber-950/60 text-amber-300 border-amber-700/50 hover:bg-amber-900/60'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Factory className={`w-4 h-4 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
              <span>Admin Portal & Inventory</span>
            </button>
          )}

          {/* My Orders shortcut in mobile menu if logged in */}
          {firebaseUser && (
            <button
              onClick={() => {
                onSelectView('tracking');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                isDarkMode ? 'text-stone-300 hover:bg-stone-900' : 'text-stone-700 hover:bg-amber-50'
              }`}
            >
              <User className="w-4 h-4 text-amber-500" />
              <span>My Orders & Live Tracking</span>
            </button>
          )}

          <div className={`space-y-1 pt-2 border-t ${isDarkMode ? 'border-stone-800' : 'border-amber-200'}`}>
            <span className={`text-[11px] font-bold px-4 block uppercase tracking-wider ${
              isDarkMode ? 'text-amber-400' : 'text-amber-800'
            }`}>
              Product Categories:
            </span>
            <button
              onClick={() => handleCategoryClick('Copper Yantra')}
              className={`w-full text-left px-6 py-2 text-xs font-bold flex items-center gap-2 rounded-lg ${
                isDarkMode ? 'text-amber-200 hover:bg-stone-900' : 'text-amber-900 hover:bg-amber-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Copper Yantra</span>
            </button>

            <button
              onClick={() => handleCategoryClick('Pooja Products', 'All')}
              className={`w-full text-left px-6 py-2 text-xs font-bold flex items-center gap-2 rounded-lg ${
                isDarkMode ? 'text-amber-300 hover:bg-stone-900' : 'text-amber-900 hover:bg-amber-50'
              }`}
            >
              <Package className="w-3.5 h-3.5 text-amber-500" />
              <span>Pooja Products (All)</span>
            </button>

            {poojaSubCategories.map((subCat) => (
              <button
                key={subCat}
                onClick={() => handleCategoryClick('Pooja Products', subCat)}
                className={`w-full text-left px-8 py-1.5 text-xs rounded-lg transition-colors ${
                  isDarkMode ? 'text-stone-300 hover:text-amber-300 hover:bg-stone-900' : 'text-stone-600 hover:text-amber-900 hover:bg-amber-50'
                }`}
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
