import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { listenToMenuItems, seedInitialMenuIfEmpty } from './services/menuService';
import { listenToStudentOrders } from './services/orderService';
import { MenuItem, Order, MainProductSection, PoojaSubCategory } from './types';

// Copper Yantra Platform Components & Nav
import { CopperHeader, ActiveAppView } from './components/CopperHeader';
import { YantraCatalogScreen } from './screens/student/YantraCatalogScreen';
import { AboutServicesPortfolioBlogPages } from './screens/info/AboutServicesPortfolioBlogPages';
import { OrderTrackingScreen } from './screens/student/OrderTrackingScreen';
import { FactoryBatchPortal } from './screens/admin/FactoryBatchPortal';
import { AdminDashboard } from './screens/admin/AdminDashboard';
import { AIChatbotModal } from './components/AIChatbotModal';

// Cart & Auth Modals
import { BiteJoyCartDrawer } from './components/BiteJoyCartDrawer';
import { BiteJoyAuthModal } from './components/BiteJoyAuthModal';
import { Bot, MessageCircle } from 'lucide-react';

export const ReactApp: React.FC = () => {
  const { firebaseUser, profile } = useAuth();
  const { items: cartItems } = useCart();
  const [currentView, setCurrentView] = useState<ActiveAppView>('home');
  const [selectedSection, setSelectedSection] = useState<MainProductSection>('All');
  const [selectedPoojaSubCategory, setSelectedPoojaSubCategory] = useState<PoojaSubCategory>('All');
  const [headerSearch, setHeaderSearch] = useState<string>('');

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const [studentOrders, setStudentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Dark / Light Mode Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('bpc_theme') !== 'light';
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('bpc_theme', next ? 'dark' : 'light');
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Seed initial Yantra products if empty and listen to catalog updates
  useEffect(() => {
    seedInitialMenuIfEmpty().catch(() => {});
    const unsub = listenToMenuItems((items) => {
      setMenuItems(items);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Listen to customer orders
  useEffect(() => {
    const unsub = listenToStudentOrders(firebaseUser?.uid || 'guest-user', (orders) => {
      setStudentOrders(orders);
      if (!trackingOrderId && orders.length > 0) {
        setTrackingOrderId(orders[0].id);
      }
    });
    return unsub;
  }, [firebaseUser, trackingOrderId]);

  // If user is admin on load, navigate directly to Admin Dashboard
  useEffect(() => {
    if (profile?.role === 'admin') {
      setCurrentView('admin');
    }
  }, [profile]);

  // Handle successful checkout order creation
  const handleOrderSuccess = (order: Order) => {
    setTrackingOrderId(order.id);
    setCurrentView('tracking');
  };

  const activeTrackingId = trackingOrderId || (studentOrders.length > 0 ? studentOrders[0].id : null);

  const openWhatsApp = () => {
    const phoneNumber = '919876543210';
    const message = encodeURIComponent('Hello Bhavna Pooja Center, I have an inquiry regarding your Copper Yantras and Pooja essentials.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col selection:bg-amber-500 selection:text-stone-950 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#120F0D] text-stone-100' : 'bg-amber-50/60 text-stone-900'
    }`}>
      {/* Top Application Header */}
      <CopperHeader
        activeView={currentView}
        onSelectView={(view) => {
          if (view === 'ai-assistant') {
            setAiChatOpen(true);
          } else {
            setCurrentView(view);
          }
        }}
        onSelectCategory={(sec, subCat) => {
          setSelectedSection(sec);
          setSelectedPoojaSubCategory(subCat || 'All');
          setCurrentView('catalog');
        }}
        onSearch={(query) => {
          setHeaderSearch(query);
          setCurrentView('catalog');
        }}
        onOpenCart={() => setCartOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
        hasActiveOrder={Boolean(activeTrackingId)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main View Router Container */}
      <main className="flex-1 w-full flex flex-col justify-start">
        {currentView === 'catalog' && (
          <YantraCatalogScreen
            menuItems={menuItems}
            loading={loading}
            onOpenCart={() => setCartOpen(true)}
            initialSection={selectedSection}
            initialPoojaSubCategory={selectedPoojaSubCategory}
            initialSearchQuery={headerSearch}
          />
        )}

        {(currentView === 'home' ||
          currentView === 'about' ||
          currentView === 'services' ||
          currentView === 'portfolio' ||
          currentView === 'blog') && (
          <AboutServicesPortfolioBlogPages
            currentView={currentView}
            onSelectView={setCurrentView}
            onSelectCategory={(sec, subCat) => {
              setSelectedSection(sec);
              setSelectedPoojaSubCategory(subCat || 'All');
              setCurrentView('catalog');
            }}
            featuredItems={menuItems}
            onOpenCart={() => setCartOpen(true)}
            onOpenAiChat={() => setAiChatOpen(true)}
          />
        )}

        {currentView === 'tracking' && (
          <OrderTrackingScreen
            orderId={activeTrackingId}
            onBackToMenu={() => setCurrentView('catalog')}
          />
        )}

        {currentView === 'factory-batch' && <FactoryBatchPortal />}

        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* Floating Action Buttons (AI Advisor + WhatsApp below) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Floating AI Chatbot Button */}
        <button
          onClick={() => setAiChatOpen(true)}
          className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 p-3.5 rounded-full shadow-2xl border-2 border-stone-950 flex items-center gap-2 group transition-all hover:scale-105 active:scale-95"
          title="Open AI Yantra Advisor"
        >
          <Bot className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pr-1">
            Ask AI Yantra Advisor
          </span>
        </button>

        {/* Floating WhatsApp Button (Below AI Chatbot) */}
        <button
          onClick={openWhatsApp}
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl border-2 border-stone-950 flex items-center gap-2 group transition-all hover:scale-105 active:scale-95"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pr-1">
            Chat on WhatsApp
          </span>
        </button>
      </div>

      {/* AI Assistant Chatbot Modal */}
      <AIChatbotModal isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />

      {/* Cart Tray Modal */}
      <BiteJoyCartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onOrderSuccess={handleOrderSuccess}
        onRequireAuth={() => setAuthOpen(true)}
      />

      {/* Auth Modal */}
      <BiteJoyAuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={(loggedProfile) => {
          setAuthOpen(false);
          if (loggedProfile.role === 'admin') {
            setCurrentView('admin');
          } else {
            setCurrentView('catalog');
            if (cartItems.length > 0) {
              setCartOpen(true);
            }
          }
        }}
      />
    </div>
  );
};
