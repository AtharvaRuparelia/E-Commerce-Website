import React, { useState } from 'react';
import {
  Flame,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronRight,
  BookOpen,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Hammer,
  Layers,
  Send,
  ShoppingBag,
  Bot,
  MessageCircle,
  Star,
  Zap,
  Check,
  Compass,
  Sun,
  Gift,
  Truck,
  HeartHandshake,
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';
import { ActiveAppView } from '../../components/CopperHeader';
import { MenuItem, MainProductSection, PoojaSubCategory } from '../../types';
import { useCart } from '../../context/CartContext';

interface InfoPagesProps {
  currentView: ActiveAppView;
  onSelectView: (view: ActiveAppView) => void;
  onSelectCategory?: (sec: MainProductSection, subCat?: PoojaSubCategory) => void;
  featuredItems?: MenuItem[];
  onOpenCart?: () => void;
  onOpenAiChat?: () => void;
}

export const AboutServicesPortfolioBlogPages: React.FC<InfoPagesProps> = ({
  currentView,
  onSelectView,
  onSelectCategory,
  featuredItems = [],
  onOpenCart,
  onOpenAiChat
}) => {
  const { items: cartItems, addItem, updateQuantity } = useCart();
  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null);
  const [activeIntent, setActiveIntent] = useState<'wealth' | 'protection' | 'knowledge' | 'vastu'>('wealth');

  // Appointment Form state
  const [aptName, setAptName] = useState('');
  const [aptPhone, setAptPhone] = useState('');
  const [aptDate, setAptDate] = useState('');
  const [aptSuccess, setAptSuccess] = useState(false);

  const handleAddToCart = (item: MenuItem) => {
    addItem(item, 1);
    setAddedNoticeId(item.id);
    setTimeout(() => setAddedNoticeId(null), 2000);
  };

  const openWhatsApp = () => {
    const phoneNumber = '919876543210';
    const message = encodeURIComponent('Hello Bhavna Pooja Center, I have an inquiry regarding your Copper Yantras and Pooja essentials.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // HOME PAGE (4.4.5.1)
  if (currentView === 'home') {
    const defaultSpotlightItem: MenuItem = featuredItems[0] || {
      id: 'yantra-1',
      name: 'Shree Yantra',
      section: 'Copper Yantra',
      category: 'Shree Yantra',
      price: 1499,
      description: 'Masterfully etched pure copper Shree Yantra with precise sacred 3D geometric energy alignments.',
      imageUrl: '/items/shree-yantra.jpg',
      isAvailable: true,
      metalWeightGrams: 250,
      dimensionsInches: '6x6 in'
    };

    // Yantra intent mapping
    const intentMap = {
      wealth: {
        title: 'Wealth, Abundance & Prosperity',
        yantraName: 'Shree Yantra',
        desc: 'The supreme Yantra of Goddess Lakshmi. Attracts financial growth, stability, and cosmic abundance.',
        weight: '250g',
        size: '6x6 in',
        price: 1499,
        badge: 'Recommended Altar Centerpiece',
        item: featuredItems.find(i => i.name.includes('Shree Yantra')) || defaultSpotlightItem
      },
      protection: {
        title: 'Health, Longevity & Fearlessness',
        yantraName: 'Mahamrityunjaya Yantra',
        desc: 'Sacred Lord Shiva Yantra for protection against illness, negative energies, and untimely mishaps.',
        weight: '200g',
        size: '6x6 in',
        price: 1299,
        badge: 'Sacred Shield of Protection',
        item: featuredItems.find(i => i.name.includes('Mahamrityunjaya')) || defaultSpotlightItem
      },
      knowledge: {
        title: 'Education, Memory & Wisdom',
        yantraName: 'Saraswati Yantra',
        desc: 'Dedicated to Goddess Saraswati. Enhances concentration, academic success, and artistic clarity.',
        weight: '180g',
        size: '6x6 in',
        price: 1199,
        badge: 'Ideal for Study Altar',
        item: featuredItems.find(i => i.name.includes('Saraswati')) || defaultSpotlightItem
      },
      vastu: {
        title: 'Home Harmony & Vastu Rectification',
        yantraName: 'Vastu Dosh Nivaran Yantra',
        desc: 'Harmonizes directional energy defects in homes, offices, and industrial premises.',
        weight: '300g',
        size: '8x8 in',
        price: 1899,
        badge: 'Vastu Practitioner Choice',
        item: featuredItems.find(i => i.name.includes('Vastu Dosh')) || defaultSpotlightItem
      }
    };

    const currentIntentData = intentMap[activeIntent];

    return (
      <div className="w-full bg-[#120F0D] text-stone-100 min-h-screen pb-16 space-y-16 selection:bg-amber-500 selection:text-stone-950">
        {/* FESTIVE ANNOUNCEMENT BANNER */}
        <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-200 border-b border-amber-600/40 text-[11px] sm:text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-inner">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
          <span>
            <strong>Bhavna Pooja Center:</strong> 100% Certified Pure Heavy Copper • Direct Shop Dispatch with Tax Invoice & Consecration Certificate!
          </span>
        </div>

        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-b from-[#2D1F16] via-[#1A1410] to-[#120F0D] border-b border-amber-900/40 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Subtle Ambient Radial Glows & Geometry */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-600/5 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Headline Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-950 to-stone-900 border border-amber-600/50 text-amber-300 text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>40+ Years Heritage Manufacturing Shop</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight text-amber-100 leading-tight">
                Sacred Energy Handcrafted <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow">
                  For Your Altar & Home
                </span>
              </h1>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Crafted in our Mumbai shop using authentic 0.8mm acid deep etching. 100% pure heavy copper Yantras, organic hand-rolled Agarbattis, pure Cow Dung Dhoop, Rudraksha Malas, and consecrated Puja vessels.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-stone-300">
                <span className="bg-stone-900/90 border border-amber-600/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-amber-400" /> 0.8mm Deep Etched Copper
                </span>
                <span className="bg-stone-900/90 border border-amber-600/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-amber-400" /> Pure Copper Polish Finish
                </span>
                <span className="bg-stone-900/90 border border-amber-600/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-amber-400" /> Verified Sacred Geometry
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
                <button
                  onClick={() => onSelectView('catalog')}
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-black rounded-2xl shadow-xl transition-all flex items-center gap-2 text-xs sm:text-sm active:scale-95"
                >
                  <ShoppingBag className="w-4.5 h-4.5" />
                  <span>Explore Full Collection</span>
                </button>

                {onOpenAiChat && (
                  <button
                    onClick={onOpenAiChat}
                    className="px-5 py-3.5 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-600/50 font-bold rounded-2xl text-xs sm:text-sm transition-all flex items-center gap-2 shadow"
                  >
                    <Bot className="w-4.5 h-4.5 text-amber-400" />
                    <span>Ask AI Yantra Advisor</span>
                  </button>
                )}

                <button
                  onClick={openWhatsApp}
                  className="px-4 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-2xl text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>WhatsApp Inquiry</span>
                </button>
              </div>
            </div>

            {/* Right Spotlight Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-stone-900/90 border-2 border-amber-600/50 rounded-3xl p-6 shadow-2xl space-y-4 backdrop-blur relative group">
                <div className="relative h-64 rounded-2xl overflow-hidden border border-amber-600/30">
                  <img
                    src={defaultSpotlightItem.imageUrl}
                    alt={defaultSpotlightItem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow">
                    FEATURED ARTISAN SPOTLIGHT
                  </span>
                  <span className="absolute bottom-3 right-3 bg-stone-950/90 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-800">
                    Live Stock: {defaultSpotlightItem.stockCountRemaining || 35} Units
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif font-bold text-amber-200 text-base">
                      {defaultSpotlightItem.name}
                    </h3>
                    <span className="text-lg font-mono font-bold text-amber-400 shrink-0 ml-2">
                      ₹{defaultSpotlightItem.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-stone-400 text-xs line-clamp-2">
                    {defaultSpotlightItem.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-stone-300 bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
                    <div>
                      <span className="text-stone-500 block">Pure Copper Weight:</span>
                      <span className="font-semibold text-amber-200">
                        {defaultSpotlightItem.metalWeightGrams ? `${defaultSpotlightItem.metalWeightGrams}g` : '250g'}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Dimensions:</span>
                      <span className="font-semibold text-amber-200">
                        {defaultSpotlightItem.dimensionsInches || '6x6 in'}
                      </span>
                    </div>
                  </div>
                </div>

                {(() => {
                  const cartEntry = cartItems.find((ci) => ci.menuItem.id === defaultSpotlightItem.id);
                  const qtyInCart = cartEntry ? cartEntry.quantity : 0;

                  if (qtyInCart > 0) {
                    return (
                      <div className="w-full py-2 bg-stone-950 border border-amber-600/50 rounded-xl flex items-center justify-between px-4 shadow">
                        <span className="text-xs font-bold text-amber-200">Quantity in Cart:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(defaultSpotlightItem.id, qtyInCart - 1)}
                            className="w-7 h-7 bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold rounded-lg flex items-center justify-center text-sm"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono font-black text-amber-300 px-2 text-sm">{qtyInCart}</span>
                          <button
                            onClick={() => updateQuantity(defaultSpotlightItem.id, qtyInCart + 1)}
                            className="w-7 h-7 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg flex items-center justify-center text-sm"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <button
                      onClick={() => handleAddToCart(defaultSpotlightItem)}
                      className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow ${
                        addedNoticeId === defaultSpotlightItem.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-600 hover:bg-amber-500 text-stone-950 active:scale-95'
                      }`}
                    >
                      {addedNoticeId === defaultSpotlightItem.id ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Added to Shopping Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add Spotlight Yantra to Cart</span>
                        </>
                      )}
                    </button>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* 4 KEY TRUST PILLARS BAR */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-stone-900/80 border border-amber-600/30 rounded-2xl p-4 flex items-center gap-3 backdrop-blur shadow">
              <div className="w-10 h-10 bg-amber-950 text-amber-400 rounded-xl flex items-center justify-center shrink-0 border border-amber-800">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-200">Express All-India Shipping</h4>
                <p className="text-[11px] text-stone-400">Safe padded box packaging</p>
              </div>
            </div>

            <div className="bg-stone-900/80 border border-amber-600/30 rounded-2xl p-4 flex items-center gap-3 backdrop-blur shadow">
              <div className="w-10 h-10 bg-amber-950 text-amber-400 rounded-xl flex items-center justify-center shrink-0 border border-amber-800">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-200">100% Pure Heavy Copper</h4>
                <p className="text-[11px] text-stone-400">0.8mm Acid etched geometric accuracy</p>
              </div>
            </div>

            <div className="bg-stone-900/80 border border-amber-600/30 rounded-2xl p-4 flex items-center gap-3 backdrop-blur shadow">
              <div className="w-10 h-10 bg-amber-950 text-amber-400 rounded-xl flex items-center justify-center shrink-0 border border-amber-800">
                <Hammer className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-200">Direct Shop Pricing</h4>
                <p className="text-[11px] text-stone-400">No middleman price inflations</p>
              </div>
            </div>

            <div className="bg-stone-900/80 border border-amber-600/30 rounded-2xl p-4 flex items-center gap-3 backdrop-blur shadow">
              <div className="w-10 h-10 bg-amber-950 text-amber-400 rounded-xl flex items-center justify-center shrink-0 border border-amber-800">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-200">WhatsApp Expert Advice</h4>
                <p className="text-[11px] text-stone-400">Free directional placement guidance</p>
              </div>
            </div>
          </div>
        </section>

        {/* EXPLORE SUB-CATEGORIES TILES SHOWCASE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono bg-amber-950 text-amber-300 px-3 py-1 rounded-full border border-amber-800">
              EXPLORE OUR DEPARTMENTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
              Sacred Collections & Pooja Essentials
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
              Select a sacred category below to browse specific handcrafted Yantras, organic incenses, or copper ritual vessels.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Tile 1: Copper Yantra */}
            <button
              onClick={() => onSelectCategory ? onSelectCategory('Copper Yantra') : onSelectView('catalog')}
              className="bg-stone-900/90 border border-stone-800 hover:border-amber-600/60 p-4 rounded-2xl text-center group transition-all hover:bg-stone-850 flex flex-col items-center gap-2 shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-700/50 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif font-bold text-xs text-amber-100 block group-hover:text-amber-300">
                  Copper Yantra
                </span>
                <span className="text-[10px] text-stone-500">Shree, Kuber, Vastu</span>
              </div>
            </button>

            {/* Tile 2: Aggarbatti */}
            <button
              onClick={() => onSelectCategory ? onSelectCategory('Pooja Products', 'Aggarbatti') : onSelectView('catalog')}
              className="bg-stone-900/90 border border-stone-800 hover:border-amber-600/60 p-4 rounded-2xl text-center group transition-all hover:bg-stone-850 flex flex-col items-center gap-2 shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-700/50 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif font-bold text-xs text-amber-100 block group-hover:text-amber-300">
                  Aggarbatti
                </span>
                <span className="text-[10px] text-stone-500">Sandal, Rose, Mogra</span>
              </div>
            </button>

            {/* Tile 3: Dhoop Batti */}
            <button
              onClick={() => onSelectCategory ? onSelectCategory('Pooja Products', 'Dhoop batti') : onSelectView('catalog')}
              className="bg-stone-900/90 border border-stone-800 hover:border-amber-600/60 p-4 rounded-2xl text-center group transition-all hover:bg-stone-850 flex flex-col items-center gap-2 shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-700/50 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <Sun className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif font-bold text-xs text-amber-100 block group-hover:text-amber-300">
                  Dhoop Batti
                </span>
                <span className="text-[10px] text-stone-500">Guggal, Sambrani</span>
              </div>
            </button>

            {/* Tile 4: Dhoop */}
            <button
              onClick={() => onSelectCategory ? onSelectCategory('Pooja Products', 'Dhoop') : onSelectView('catalog')}
              className="bg-stone-900/90 border border-stone-800 hover:border-amber-600/60 p-4 rounded-2xl text-center group transition-all hover:bg-stone-850 flex flex-col items-center gap-2 shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-700/50 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif font-bold text-xs text-amber-100 block group-hover:text-amber-300">
                  Pure Dhoop
                </span>
                <span className="text-[10px] text-stone-500">Cow Dung & Herbal</span>
              </div>
            </button>

            {/* Tile 5: Mala */}
            <button
              onClick={() => onSelectCategory ? onSelectCategory('Pooja Products', 'Mala') : onSelectView('catalog')}
              className="bg-stone-900/90 border border-stone-800 hover:border-amber-600/60 p-4 rounded-2xl text-center group transition-all hover:bg-stone-850 flex flex-col items-center gap-2 shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-700/50 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif font-bold text-xs text-amber-100 block group-hover:text-amber-300">
                  Sacred Mala
                </span>
                <span className="text-[10px] text-stone-500">108 Bead Rudraksha</span>
              </div>
            </button>

            {/* Tile 6: Copper Products */}
            <button
              onClick={() => onSelectCategory ? onSelectCategory('Pooja Products', 'Copper Products') : onSelectView('catalog')}
              className="bg-stone-900/90 border border-stone-800 hover:border-amber-600/60 p-4 rounded-2xl text-center group transition-all hover:bg-stone-850 flex flex-col items-center gap-2 shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-700/50 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <Hammer className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif font-bold text-xs text-amber-100 block group-hover:text-amber-300">
                  Copper Goods
                </span>
                <span className="text-[10px] text-stone-500">Kalash, Lota, Thali</span>
              </div>
            </button>
          </div>
        </section>

        {/* INTERACTIVE SACRED YANTRA FINDER WIDGET */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-stone-900 via-[#1F1712] to-stone-900 border-2 border-amber-600/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-4">
              <div>
                <span className="text-xs font-mono bg-amber-950 text-amber-300 px-3 py-1 rounded-full border border-amber-800">
                  INTERACTIVE INTENT GUIDE
                </span>
                <h2 className="text-2xl font-serif font-bold text-amber-200 mt-2">
                  Find the Exact Yantra for Your Spiritual Need
                </h2>
                <p className="text-xs text-stone-400">
                  Select your primary intention to discover the specific geometrically verified Yantra crafted for your goal.
                </p>
              </div>

              {/* Intent Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveIntent('wealth')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeIntent === 'wealth'
                      ? 'bg-amber-600 text-stone-950 shadow-lg'
                      : 'bg-stone-950 text-stone-400 hover:text-amber-300 border border-stone-800'
                  }`}
                >
                  💰 Wealth & Prosperity
                </button>
                <button
                  onClick={() => setActiveIntent('protection')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeIntent === 'protection'
                      ? 'bg-amber-600 text-stone-950 shadow-lg'
                      : 'bg-stone-950 text-stone-400 hover:text-amber-300 border border-stone-800'
                  }`}
                >
                  🛡️ Protection & Health
                </button>
                <button
                  onClick={() => setActiveIntent('knowledge')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeIntent === 'knowledge'
                      ? 'bg-amber-600 text-stone-950 shadow-lg'
                      : 'bg-stone-950 text-stone-400 hover:text-amber-300 border border-stone-800'
                  }`}
                >
                  📚 Knowledge & Career
                </button>
                <button
                  onClick={() => setActiveIntent('vastu')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeIntent === 'vastu'
                      ? 'bg-amber-600 text-stone-950 shadow-lg'
                      : 'bg-stone-950 text-stone-400 hover:text-amber-300 border border-stone-800'
                  }`}
                >
                  🏡 Vastu & Harmony
                </button>
              </div>
            </div>

            {/* Active Intent Highlight Box */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-stone-950/80 p-6 rounded-2xl border border-stone-800">
              <div className="md:col-span-8 space-y-3">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800 inline-block">
                  {currentIntentData.badge}
                </span>
                <h3 className="text-xl font-serif font-bold text-amber-100">
                  {currentIntentData.yantraName}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {currentIntentData.desc}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-stone-400 pt-2">
                  <span>Weight: <strong className="text-amber-300">{currentIntentData.weight}</strong></span>
                  <span>Dimensions: <strong className="text-amber-300">{currentIntentData.size}</strong></span>
                  <span>Pure Heavy Gauge: <strong className="text-amber-300">0.8mm Etched</strong></span>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col items-end justify-center space-y-3 border-t md:border-t-0 md:border-l border-stone-800 pt-4 md:pt-0 md:pl-6">
                <span className="text-2xl font-mono font-black text-amber-400">
                  ₹{currentIntentData.price.toLocaleString()}
                </span>
                {(() => {
                  const cartEntry = cartItems.find((ci) => ci.menuItem.id === currentIntentData.item.id);
                  const qtyInCart = cartEntry ? cartEntry.quantity : 0;

                  if (qtyInCart > 0) {
                    return (
                      <div className="w-full py-2 bg-stone-900 border border-amber-600/50 rounded-xl flex items-center justify-between px-3 shadow">
                        <span className="text-xs font-bold text-amber-200">In Cart:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(currentIntentData.item.id, qtyInCart - 1)}
                            className="w-7 h-7 bg-stone-950 hover:bg-stone-800 text-amber-300 font-bold rounded-lg flex items-center justify-center text-sm"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono font-black text-amber-300 px-2 text-sm">{qtyInCart}</span>
                          <button
                            onClick={() => updateQuantity(currentIntentData.item.id, qtyInCart + 1)}
                            className="w-7 h-7 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg flex items-center justify-center text-sm"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <button
                      onClick={() => handleAddToCart(currentIntentData.item)}
                      className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Recommended Yantra</span>
                    </button>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* CURATED FEATURED PRODUCTS GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <span className="text-xs font-mono bg-amber-950 text-amber-300 px-3 py-1 rounded-full border border-amber-800">
                HANDCRAFTED SELECTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 mt-2">
                Popular Copper Yantras & Ritual Essentials
              </h2>
            </div>

            <button
              onClick={() => onSelectView('catalog')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-stone-900 border border-stone-800 px-4 py-2 rounded-xl"
            >
              <span>View Full Catalog ({featuredItems.length} items)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="bg-stone-900/90 border border-stone-800 rounded-3xl overflow-hidden hover:border-amber-600/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="relative h-48 bg-stone-950 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 bg-amber-600 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded shadow">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif font-bold text-amber-100 text-sm group-hover:text-amber-300 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-stone-400 line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className={`grid ${item.dimensionsInches ? 'grid-cols-2' : 'grid-cols-1'} gap-2 text-[10px] text-stone-300 bg-stone-950/60 p-2 rounded-xl border border-stone-800/80`}>
                    <div>
                      <span className="text-stone-500 block">Weight:</span>
                      <span className="font-semibold text-amber-200">
                        {item.metalWeightGrams ? `${item.metalWeightGrams}g` : '200g'}
                      </span>
                    </div>
                    {item.dimensionsInches && (
                      <div>
                        <span className="text-stone-500 block">Size:</span>
                        <span className="font-semibold text-amber-200">
                          {item.dimensionsInches}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                    <span className="text-base font-black text-amber-400 font-mono">
                      ₹{item.price.toLocaleString()}
                    </span>
                    {(() => {
                      const isOutOfStock = item.isAvailable === false || (item.stockCountRemaining ?? 0) <= 0;
                      if (isOutOfStock) {
                        return (
                          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-stone-950 text-rose-400 border border-rose-800/80">
                            Out of Stock
                          </span>
                        );
                      }

                      const cartEntry = cartItems.find((ci) => ci.menuItem.id === item.id);
                      const qtyInCart = cartEntry ? cartEntry.quantity : 0;

                      if (qtyInCart > 0) {
                        return (
                          <div className="flex items-center gap-1 bg-stone-950 border border-amber-600/50 rounded-xl p-1 shadow">
                            <button
                              onClick={() => updateQuantity(item.id, qtyInCart - 1)}
                              className="w-6 h-6 bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold rounded flex items-center justify-center text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono font-black text-amber-300 px-1.5 text-xs">{qtyInCart}</span>
                            <button
                              onClick={() => updateQuantity(item.id, qtyInCart + 1)}
                              className="w-6 h-6 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded flex items-center justify-center text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      }

                      return (
                        <button
                          onClick={() => handleAddToCart(item)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow ${
                            addedNoticeId === item.id
                              ? 'bg-emerald-600 text-white'
                              : 'bg-amber-600 hover:bg-amber-500 text-stone-950'
                          }`}
                        >
                          {addedNoticeId === item.id ? 'Added' : 'Add to Cart'}
                        </button>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY PURE COPPER MATTERS (4 FEATURE CARDS) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono bg-amber-950 text-amber-300 px-3 py-1 rounded-full border border-amber-800">
              SACRED QUALITY STANDARDS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
              Why Devotees Choose Bhavna Pooja Center
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 space-y-3 hover:border-amber-600/40 transition-all shadow-xl">
              <div className="w-12 h-12 bg-amber-950 text-amber-400 rounded-2xl flex items-center justify-center border border-amber-800">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-amber-200 text-base">99.9% Pure Heavy Copper</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Heavy gauge pure copper conducts cosmic energy and neutralizes negative Vastu doshas effectively.
              </p>
            </div>

            <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 space-y-3 hover:border-amber-600/40 transition-all shadow-xl">
              <div className="w-12 h-12 bg-amber-950 text-amber-400 rounded-2xl flex items-center justify-center border border-amber-800">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-amber-200 text-base">Pure Copper Craftsmanship</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                High grade pure copper prevents tarnishing, keeping your Yantra mirror-bright with simple natural care.
              </p>
            </div>

            <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 space-y-3 hover:border-amber-600/40 transition-all shadow-xl">
              <div className="w-12 h-12 bg-amber-950 text-amber-400 rounded-2xl flex items-center justify-center border border-amber-800">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-amber-200 text-base">0.8mm Acid Deep Etching</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Precision 3D geometric lines engraved deeply by skilled artisans to ensure authentic energy alignments.
              </p>
            </div>

            <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 space-y-3 hover:border-amber-600/40 transition-all shadow-xl">
              <div className="w-12 h-12 bg-amber-950 text-amber-400 rounded-2xl flex items-center justify-center border border-amber-800">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-amber-200 text-base">Direct Shop Pricing</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Handcrafted in our own family manufacturing shop, eliminating middleman markups for honest pricing.
              </p>
            </div>
          </div>
        </section>

        {/* HERITAGE STATS BAR */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-stone-900/80 border border-amber-600/30 rounded-3xl p-6 text-center shadow-xl backdrop-blur">
            <div className="space-y-1 p-2 border-r border-stone-800 last:border-r-0">
              <span className="text-3xl font-black font-serif text-amber-400">40+</span>
              <span className="text-xs text-stone-300 block font-semibold">Years Craft Heritage</span>
            </div>
            <div className="space-y-1 p-2 border-r border-stone-800 last:border-r-0">
              <span className="text-3xl font-black font-serif text-amber-400">10,000+</span>
              <span className="text-xs text-stone-300 block font-semibold">Devotee Households</span>
            </div>
            <div className="space-y-1 p-2 border-r border-stone-800 last:border-r-0">
              <span className="text-3xl font-black font-serif text-emerald-400">100%</span>
              <span className="text-xs text-stone-300 block font-semibold">Vedic Geometric Precision</span>
            </div>
            <div className="space-y-1 p-2">
              <span className="text-3xl font-black font-serif text-amber-400">Direct</span>
              <span className="text-xs text-stone-300 block font-semibold">Shop Dispatch</span>
            </div>
          </div>
        </section>

        {/* FESTIVE & CUSTOM CONSECRATION BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border border-amber-600/50 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-900/80 border border-amber-600/40 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full">
                <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Custom Temple & Corporate Orders</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
                Need Custom Sized Yantras or Bulk Festive Gift Boxes?
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                We craft custom heavy copper Yantras (up to 24x24 inch) and bulk gift sets for Diwali, housewarming, and temple consecration rituals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={openWhatsApp}
                className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4.5 h-4.5 fill-white text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </button>
              <button
                onClick={() => onSelectView('about')}
                className="px-6 py-3.5 bg-stone-950 hover:bg-stone-800 text-amber-300 border border-amber-600/40 font-bold rounded-2xl text-xs sm:text-sm"
              >
                Contact Shop
              </button>
            </div>
          </div>
        </section>

        {/* DEVOTEE TESTIMONIALS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono bg-amber-950 text-amber-300 px-3 py-1 rounded-full border border-amber-800">
              DEVOTEE BLESSINGS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
              What Devotees Say About Our Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-300 italic leading-relaxed">
                "The Pure Copper Shree Yantra from Bhavna Pooja Center has remarkable geometric clarity. Deep etching is clearly visible, and it has enhanced the positive vibe in my office altar."
              </p>
              <div>
                <span className="font-bold text-amber-200 text-xs block">Rajesh Sharma</span>
                <span className="text-[10px] text-stone-500">Business Owner, Mumbai</span>
              </div>
            </div>

            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-300 italic leading-relaxed">
                "Heavy pure copper quality kalash and 7-piece thali set. Excellent shop direct craftsmanship. Delivery was fast with live tracking and PDF invoice."
              </p>
              <div>
                <span className="font-bold text-amber-200 text-xs block">Sunita Joshi</span>
                <span className="text-[10px] text-stone-500">Devotee, Pune</span>
              </div>
            </div>

            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-300 italic leading-relaxed">
                "I ordered the Vastu Dosh Nivaran copper Yantra and consulted their AI Yantra Advisor for directional placement. Truly authentic work."
              </p>
              <div>
                <span className="font-bold text-amber-200 text-xs block">Dr. Milind Kulkarni</span>
                <span className="text-[10px] text-stone-500">Vastu Consultant, Thane</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ABOUT US PAGE (4.4.5.2)
  if (currentView === 'about') {
    return (
      <div className="w-full bg-[#120F0D] text-stone-100 min-h-screen pb-16 pt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono bg-amber-950 text-amber-300 px-3 py-1 rounded-full border border-amber-800">
              OUR SHOP STORY
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-200">
              About Bhavna Pooja Center
            </h1>
            <p className="text-sm text-stone-400 max-w-2xl mx-auto">
              Bridging traditional sacred metal crafting with modern digital inventory reconciliation.
            </p>
          </div>

          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl leading-relaxed text-sm text-stone-300">
            <p>
              Our family enterprise, **Bhavna Pooja Center**, operates in a specialized spiritual market, supplying a wide variety of authentic Pooja items, holy ritual essentials, and handcrafted sacred copper Yantras. What makes our enterprise distinct is that we operate our own dedicated manufacturing shop where skilled artisans craft copper Yantras using traditional acid etching and precision metal-cutting techniques.
            </p>
            <p>
              Previously, our retail store counter and manufacturing shop functioned as isolated manual units. Stock levels between the store counter and shop floor were logged manually in physical paper registers, leading to frequent inventory mismatches.
            </p>
            <p>
              Developed under the guidance of Dr. Neelam Naik at SVKM's Usha Pravin Gandhi College of Arts, Science and Commerce, **Bhavna Pooja Center** digitally links our production shop directly with a modern online storefront—synchronizing stock counts in real time, streamlining order fulfillment, and expanding our market reach nationwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-stone-900/80 p-6 rounded-3xl border border-stone-800 space-y-2 text-center">
              <Hammer className="w-8 h-8 text-amber-400 mx-auto" />
              <h3 className="font-serif font-bold text-amber-200 text-sm">Traditional Metal Craft</h3>
              <p className="text-xs text-stone-400">Deep etched by skilled artisans using 99.9% heavy copper sheets.</p>
            </div>
            <div className="bg-stone-900/80 p-6 rounded-3xl border border-stone-800 space-y-2 text-center">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="font-serif font-bold text-amber-200 text-sm">Geometric Accuracy</h3>
              <p className="text-xs text-stone-400">Verified sacred angles for authentic spiritual energy alignment.</p>
            </div>
            <div className="bg-stone-900/80 p-6 rounded-3xl border border-stone-800 space-y-2 text-center">
              <Layers className="w-8 h-8 text-amber-500 mx-auto" />
              <h3 className="font-serif font-bold text-amber-200 text-sm">Live Stock Sync</h3>
              <p className="text-xs text-stone-400">Factory batch entries instantly update central storefront inventory.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SERVICES PAGE (4.4.5.3)
  if (currentView === 'services') {
    return (
      <div className="w-full bg-[#120F0D] text-stone-100 min-h-screen pb-16 pt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono bg-amber-950 text-amber-300 px-3 py-1 rounded-full border border-amber-800">
              SPECIALIZED OFFERINGS
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-200">
              Shop Customization & Services
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Custom Copper Yantra Sizing & Etching',
                desc: 'Need a specific dimension (e.g. 18x18 inch, 24x24 inch) for temple altars or large corporate offices? Our shop crafts custom heavy-gauge Yantras to exact specifications.'
              },
              {
                title: 'Bulk Corporate & Festival Gifts',
                desc: 'Specialized pure copper Yantra gift boxes tailored for corporate Diwali gifts, wedding return gifts, and housewarming ceremonies.'
              },
              {
                title: 'Vedic Ritual & Consecration Guidance',
                desc: 'Every Yantra comes with a detailed ritual placement manual specifying auspicious days, mantras, and direction orientation.'
              },
              {
                title: 'Copper Refurbishing & Protective Lacquer Coating',
                desc: 'We offer professional polishing, tarnishing prevention lacquer recoating, and restoration for old sacred copper Yantras.'
              }
            ].map((srv, idx) => (
              <div key={idx} className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 space-y-3 shadow-xl">
                <h3 className="font-serif font-bold text-amber-300 text-base">{srv.title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed">{srv.desc}</p>
                <button
                  onClick={openWhatsApp}
                  className="text-xs text-amber-500 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Request Service Quote on WhatsApp</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // PORTFOLIO / GALLERY PAGE (4.4.5.4)
  if (currentView === 'portfolio') {
    return (
      <div className="w-full bg-[#120F0D] text-stone-100 min-h-screen pb-16 pt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono bg-amber-950 text-amber-300 px-3 py-1 rounded-full border border-amber-800">
              SHOP CRAFTSMANSHIP
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-200">
              Artisan Craft Portfolio & Gallery
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Heavy Gauge 99.9% Pure Copper Sheet Cutting',
                desc: 'Precision laser & metal cutter shaping heavy copper sheets.',
                img: '/items/surya-yantra.jpg'
              },
              {
                title: 'Traditional Acid Deep Etching Process',
                desc: 'Artisans applying deep geometric etching for clear sacred lines.',
                img: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=600&q=80'
              },
              {
                title: 'Pure Copper Etching & Mirror Polish Finish',
                desc: 'Final protective mirror finish layer for tarnish-free sacred shine.',
                img: '/items/shree-yantra.jpg'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-stone-900/90 border border-stone-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="h-52 bg-stone-950">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-serif font-bold text-amber-200 text-sm">{item.title}</h3>
                  <p className="text-xs text-stone-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // BLOG PAGE (4.4.5.6)
  return (
    <div className="w-full bg-[#120F0D] text-stone-100 min-h-screen pb-16 pt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono bg-amber-950 text-amber-300 px-3 py-1 rounded-full border border-amber-800">
            SACRED GUIDANCE & ARTICLES
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-200">
            Sacred Geometry & Copper Care Blog
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'The Sacred Science Behind 3D Shree Yantra Geometry',
              date: 'September 15, 2026',
              category: 'Yantra Science',
              excerpt: 'Learn how the 9 interlocking triangles in Shree Yantra create positive vibrational energy fields in your living space.',
              img: '/items/shree-yantra.jpg'
            },
            {
              title: 'How to Clean Pure Copper Yantras Without Damaging Etching',
              date: 'August 28, 2026',
              category: 'Maintenance Tips',
              excerpt: 'Discover simple natural cleaning methods using pitambari and lemon juice to maintain pristine copper shine without synthetic chemicals.',
              img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
            }
          ].map((blog, idx) => (
            <div key={idx} className="bg-stone-900/90 border border-stone-800 rounded-3xl overflow-hidden shadow-xl space-y-4">
              <div className="h-48 bg-stone-950">
                <img src={blog.img} alt={blog.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="bg-amber-950 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-800">
                    {blog.category}
                  </span>
                  <span className="text-stone-400 font-mono">{blog.date}</span>
                </div>
                <h3 className="font-serif font-bold text-stone-100 text-base">{blog.title}</h3>
                <p className="text-xs text-stone-400">{blog.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
