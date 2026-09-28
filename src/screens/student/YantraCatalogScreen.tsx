import {
  Search,
  Filter,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Ruler,
  Weight,
  Layers,
  ChevronRight,
  Package,
  Sparkle,
  FlameKindling,
  Plus,
  Minus,
  Eye
} from 'lucide-react';
import { MenuItem, MainProductSection, PoojaSubCategory } from '../../types';
import { useCart } from '../../context/CartContext';
import { ProductDetailModal } from '../../components/ProductDetailModal';

interface YantraCatalogScreenProps {
  menuItems: MenuItem[];
  loading: boolean;
  onOpenCart: () => void;
  initialSection?: MainProductSection;
  initialPoojaSubCategory?: PoojaSubCategory;
  initialSearchQuery?: string;
}

export const YantraCatalogScreen: React.FC<YantraCatalogScreenProps> = ({
  menuItems,
  loading,
  onOpenCart,
  initialSection = 'All',
  initialPoojaSubCategory = 'All',
  initialSearchQuery = ''
}) => {
  const { items: cartItems, addItem, updateQuantity } = useCart();

  // Navigation & Sub-navigation State
  const [selectedSection, setSelectedSection] = useState<MainProductSection>(initialSection);
  const [selectedPoojaSubCategory, setSelectedPoojaSubCategory] = useState<PoojaSubCategory>(initialPoojaSubCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  useEffect(() => {
    setSelectedSection(initialSection);
    setSelectedPoojaSubCategory(initialPoojaSubCategory);
  }, [initialSection, initialPoojaSubCategory]);

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);
  const [selectedWeight, setSelectedWeight] = useState<string>('All');
  const [selectedDimension, setSelectedDimension] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'stock'>('recommended');

  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null);

  const poojaSubCategories: PoojaSubCategory[] = [
    'All',
    'Aggarbatti',
    'Dhoop Batti',
    'Dhoop',
    'Mala',
    'Copper Products',
    'Others'
  ];

  const handleAddToCart = (item: MenuItem) => {
    addItem(item, 1);
    setAddedNoticeId(item.id);
    setTimeout(() => setAddedNoticeId(null), 2000);
  };

  // Filter & Sort Logic
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Main Section Filter (Copper Yantra vs Pooja Products)
      if (selectedSection !== 'All') {
        const itemSection = item.section || (item.category.includes('Yantra') ? 'Copper Yantra' : 'Pooja Products');
        if (itemSection !== selectedSection) {
          return false;
        }
      }

      // Sub-category filter under Pooja Products
      if (selectedSection === 'Pooja Products' && selectedPoojaSubCategory !== 'All') {
        if (item.category !== selectedPoojaSubCategory) {
          return false;
        }
      }

      // Keyword Search
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Price Filter
      if (item.price > maxPrice) return false;

      // Metal Weight Filter
      if (selectedWeight !== 'All') {
        const weight = item.metalWeightGrams || 0;
        if (selectedWeight === 'under-200' && weight >= 200) return false;
        if (selectedWeight === '200-500' && (weight < 200 || weight > 500)) return false;
        if (selectedWeight === '500-plus' && weight <= 500) return false;
      }

      // Dimensions Filter
      if (selectedDimension !== 'All' && item.dimensionsInches) {
        if (!item.dimensionsInches.includes(selectedDimension)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'stock') return (b.stockCountRemaining || 0) - (a.stockCountRemaining || 0);
      return 0;
    });
  }, [
    menuItems,
    selectedSection,
    selectedPoojaSubCategory,
    searchQuery,
    selectedWeight,
    selectedDimension,
    maxPrice,
    sortBy
  ]);

  return (
    <div className="w-full min-h-screen pb-16 transition-colors duration-300 bg-amber-50/60 text-stone-900 dark:bg-[#120F0D] dark:text-stone-100">

      {/* Sub-Navigation for Pooja Products */}
      {(selectedSection === 'Pooja Products' || selectedSection === 'All') && (
        <div className="border-b py-3 px-4 sm:px-6 lg:px-8 transition-colors bg-white/90 border-amber-200 dark:bg-stone-950/90 dark:border-stone-800">
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto text-xs whitespace-nowrap">
            <span className="font-bold text-amber-600 dark:text-amber-400 mr-2 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Pooja Categories:</span>
            </span>
            {poojaSubCategories.map((subCat) => (
              <button
                key={subCat}
                onClick={() => {
                  setSelectedSection('Pooja Products');
                  setSelectedPoojaSubCategory(subCat);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  selectedSection === 'Pooja Products' && selectedPoojaSubCategory === subCat
                    ? 'bg-amber-600 text-stone-950 border-amber-500 shadow'
                    : 'bg-stone-100 text-stone-700 border-amber-200 hover:bg-amber-100 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-800 dark:hover:text-amber-300'
                }`}
              >
                {subCat === 'All' ? 'All Pooja Products' : subCat}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar: Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl p-5 space-y-5 shadow-lg backdrop-blur border bg-white border-amber-200/80 text-stone-900 dark:bg-stone-900/80 dark:border-stone-800 dark:text-stone-100">
              <div className="flex items-center justify-between border-b border-amber-100 dark:border-stone-800 pb-3">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-sm">
                  <Filter className="w-4 h-4" />
                  <span>Filter Products</span>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSection('All');
                    setSelectedPoojaSubCategory('All');
                    setSelectedWeight('All');
                    setSelectedDimension('All');
                    setMaxPrice(5000);
                  }}
                  className="text-xs text-stone-500 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400 underline"
                >
                  Reset
                </button>
              </div>

              {/* Keyword Search */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Search Products</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Shree Yantra, Agarbatti..."
                    className="w-full rounded-xl pl-9 pr-3 py-2 text-xs border bg-stone-50 border-amber-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 dark:bg-stone-950 dark:border-stone-800 dark:text-stone-200 dark:placeholder-stone-600"
                  />
                </div>
              </div>

              {/* Metal Weight Filter */}
              <div className="space-y-2 pt-2 border-t border-stone-800">
                <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                  <Weight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Metal Weight (Grams)</span>
                </label>
                <select
                  value={selectedWeight}
                  onChange={(e) => setSelectedWeight(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 focus:outline-none focus:border-amber-500"
                >
                  <option value="All">All Weights</option>
                  <option value="under-200">Lightweight (&lt; 200g)</option>
                  <option value="200-500">Medium Gauge (200g - 500g)</option>
                  <option value="500-plus">Heavy Duty (&gt; 500g)</option>
                </select>
              </div>

              {/* Sacred Dimensions Filter */}
              <div className="space-y-2 pt-2 border-t border-stone-800">
                <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-amber-500" />
                  <span>Dimensions / Size</span>
                </label>
                <select
                  value={selectedDimension}
                  onChange={(e) => setSelectedDimension(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-300 focus:outline-none focus:border-amber-500"
                >
                  <option value="All">All Dimensions</option>
                  <option value="4x4">4x4 inches</option>
                  <option value="5x5">5x5 inches</option>
                  <option value="6x6">6x6 inches</option>
                  <option value="9x9">9x9 inches</option>
                  <option value="12x12">12x12 inches</option>
                </select>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-2 pt-2 border-t border-stone-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-stone-300">Max Price</span>
                  <span className="font-mono text-amber-400 font-bold">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={5000}
                  step={50}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-stone-950 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right Main Grid: Products */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header Control Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
              <p className="text-xs text-stone-400">
                Showing <span className="font-bold text-amber-300">{filteredItems.length}</span> products in{' '}
                <span className="font-bold text-amber-400">
                  {selectedSection === 'Pooja Products' && selectedPoojaSubCategory !== 'All'
                    ? `Pooja Products ➔ ${selectedPoojaSubCategory}`
                    : selectedSection}
                </span>
              </p>

              <div className="flex items-center gap-3">
                <label className="text-xs text-stone-400">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-amber-300 font-medium focus:outline-none focus:border-amber-500"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="stock">Stock Available</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="py-20 text-center text-stone-500">
                <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs">Loading Bhavna Pooja Center Catalog...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-12 text-center space-y-3">
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
                <h3 className="text-lg font-bold text-stone-200">No Matching Products Found</h3>
                <p className="text-xs text-stone-400">
                  Try adjusting your search terms or selecting another category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => {
                  const stock = item.stockCountRemaining ?? 0;
                  const isOutOfStock = stock <= 0 || item.isAvailable === false;
                  const isLowStock = !isOutOfStock && stock <= (item.minSafetyLimit || 5);

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group shadow-md border bg-white border-amber-200 text-stone-900 dark:bg-stone-900/90 dark:border-stone-800 dark:text-stone-100 hover:border-amber-500"
                    >
                      {/* Image Thumbnail with Click trigger */}
                      <div
                        onClick={() => setSelectedProduct(item)}
                        className="relative h-48 bg-stone-950 overflow-hidden cursor-pointer group/img"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-70 group-hover/img:opacity-50 transition-opacity" />

                        {/* View Details Overlay Badge on Hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                          <span className="bg-amber-600 text-stone-950 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Details</span>
                          </span>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
                          {item.badge && (
                            <span className="bg-amber-600 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded shadow">
                              {item.badge}
                            </span>
                          )}
                          <span className="bg-stone-950/80 text-amber-300 text-[10px] px-2 py-0.5 rounded border border-amber-600/30">
                            {item.category}
                          </span>
                        </div>

                        {/* Stock Warning Badge */}
                        <div className="absolute bottom-3 right-3 pointer-events-none">
                          {isOutOfStock ? (
                            <span className="bg-rose-950 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-800">
                              Out of Stock
                            </span>
                          ) : isLowStock ? (
                            <span className="bg-amber-950 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-700 flex items-center gap-1 animate-pulse">
                              <AlertTriangle className="w-3 h-3" />
                              Only {stock} Left
                            </span>
                          ) : (
                            <span className="bg-stone-900/90 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-800">
                              {stock} Units Available
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div
                          onClick={() => setSelectedProduct(item)}
                          className="cursor-pointer"
                        >
                          <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-300 transition-colors line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-stone-600 dark:text-stone-400 line-clamp-2 mt-1">
                            {item.description}
                          </p>
                        </div>

                        {/* Product Specifications (Weight & optional Size) */}
                        <div className={`grid ${item.dimensionsInches ? 'grid-cols-2' : 'grid-cols-1'} gap-2 text-[10px] bg-stone-50 border-amber-200/80 text-stone-700 dark:bg-stone-950/60 dark:text-stone-300 p-2 rounded-xl border dark:border-stone-800/80`}>
                          <div>
                            <span className="text-stone-400 dark:text-stone-500 block">Weight:</span>
                            <span className="font-semibold text-stone-900 dark:text-amber-200">
                              {item.metalWeightGrams ? `${item.metalWeightGrams}g` : 'Standard'}
                            </span>
                          </div>
                          {item.dimensionsInches && (
                            <div>
                              <span className="text-stone-400 dark:text-stone-500 block">Size:</span>
                              <span className="font-semibold text-stone-900 dark:text-amber-200">
                                {item.dimensionsInches}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Price & Action */}
                        <div className="pt-2 border-t border-amber-200/60 dark:border-stone-800/60 flex items-center justify-between">
                          <div onClick={() => setSelectedProduct(item)} className="cursor-pointer">
                            <span className="text-[10px] text-stone-400 block">Price</span>
                            <span className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">
                              ₹{item.price.toLocaleString()}
                            </span>
                          </div>

                          {(() => {
                            const cartEntry = cartItems.find((ci) => ci.menuItem.id === item.id);
                            const qtyInCart = cartEntry ? cartEntry.quantity : 0;

                            if (qtyInCart > 0) {
                              return (
                                <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-950 border border-amber-500/50 rounded-xl p-1 shadow">
                                  <button
                                    onClick={() => updateQuantity(item.id, qtyInCart - 1)}
                                    className="w-7 h-7 bg-stone-200 dark:bg-stone-900 text-stone-900 dark:text-amber-300 font-bold rounded-lg flex items-center justify-center transition-colors active:scale-90 text-sm"
                                    title="Decrease quantity"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="font-mono font-black text-amber-700 dark:text-amber-300 px-2 text-xs">
                                    {qtyInCart}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, qtyInCart + 1)}
                                    className="w-7 h-7 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg flex items-center justify-center transition-colors active:scale-90 text-sm"
                                    title="Increase quantity"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              );
                            }

                            return (
                              <button
                                onClick={() => handleAddToCart(item)}
                                disabled={isOutOfStock}
                                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow ${
                                  addedNoticeId === item.id
                                    ? 'bg-emerald-600 text-white'
                                    : isOutOfStock
                                    ? 'bg-stone-300 text-stone-500 dark:bg-stone-800 dark:text-stone-600 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 active:scale-95'
                                }`}
                              >
                                {addedNoticeId === item.id ? (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Added</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                    <span>Add to Cart</span>
                                  </>
                                )}
                              </button>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={Boolean(selectedProduct)}
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenCart={onOpenCart}
      />
    </div>
  );
};
