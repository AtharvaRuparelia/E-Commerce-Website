import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Ruler,
  Weight,
  Layers,
  Sparkles,
  Truck,
  FileText,
  Plus,
  Minus,
  Info
} from 'lucide-react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCart?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onOpenCart
}) => {
  if (!isOpen || !item) return null;

  const { items: cartItems, addItem, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const cartEntry = cartItems.find((ci) => ci.menuItem.id === item.id);
  const currentCartQty = cartEntry ? cartEntry.quantity : 0;

  const stock = item.stockCountRemaining ?? 0;
  const isOutOfStock = stock <= 0 || item.isAvailable === false;
  const isLowStock = !isOutOfStock && stock <= (item.minSafetyLimit || 5);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(item, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-amber-300 dark:border-amber-600/40 overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Display */}
          <div className="space-y-4">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 group shadow-inner">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {item.badge && (
                  <span className="bg-amber-600 text-stone-950 text-xs font-black px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider">
                    {item.badge}
                  </span>
                )}
                <span className="bg-stone-950/80 backdrop-blur text-amber-300 text-xs px-2.5 py-1 rounded-md border border-amber-600/40 font-semibold">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Quality Assurance Guarantees */}
            <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold text-stone-600 dark:text-stone-300">
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-stone-950/60 border border-amber-200 dark:border-stone-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>100% Pure Metal</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-stone-950/60 border border-amber-200 dark:border-stone-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Tax Invoice</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-stone-950/60 border border-amber-200 dark:border-stone-800 flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Safe Express</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Purchase Actions */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Title */}
              <div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-1">
                  {item.section || (item.category.includes('Yantra') ? 'Copper Yantra' : 'Pooja Products')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  {item.name}
                </h2>
              </div>

              {/* Price & Stock Badge */}
              <div className="flex items-center justify-between gap-4 py-2 border-y border-amber-200 dark:border-stone-800">
                <div>
                  <span className="text-xs text-stone-500 block">Price (Inclusive of all Taxes)</span>
                  <span className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
                    ₹{item.price.toLocaleString()}
                  </span>
                </div>

                <div>
                  {isOutOfStock ? (
                    <span className="bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-rose-300 dark:border-rose-800">
                      Out of Stock
                    </span>
                  ) : isLowStock ? (
                    <span className="bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-400 dark:border-amber-700 flex items-center gap-1.5 animate-pulse">
                      <AlertTriangle className="w-4 h-4" />
                      Only {stock} Left
                    </span>
                  ) : (
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      In Stock ({stock} Units)
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-500" />
                  <span>Product Overview & Description</span>
                </h4>
                <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                  {item.description}
                </p>
              </div>

              {/* Technical Metal Specifications */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span>Technical & Material Specifications</span>
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs bg-amber-50/70 dark:bg-stone-950/80 p-3 rounded-2xl border border-amber-200/80 dark:border-stone-800">
                  <div>
                    <span className="text-stone-500 block text-[11px]">Weight</span>
                    <span className="font-semibold text-stone-900 dark:text-amber-200">
                      {item.metalWeightGrams ? `${item.metalWeightGrams} Grams` : 'Standard Weight'}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-500 block text-[11px]">Dimensions</span>
                    <span className="font-semibold text-stone-900 dark:text-amber-200">
                      {item.dimensionsInches || 'Standard Fit'}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-500 block text-[11px]">Etching Quality</span>
                    <span className="font-semibold text-stone-900 dark:text-amber-200 truncate block">
                      {item.etchingQuality || 'Precision Acid Etched'}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-500 block text-[11px]">Dispatch Location</span>
                    <span className="font-semibold text-stone-900 dark:text-amber-200">
                      Bhavna Workshop
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Quantity Selector & Add to Cart */}
            <div className="space-y-3 pt-4 border-t border-amber-200 dark:border-stone-800">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-xl p-1.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-amber-300 font-bold flex items-center justify-center hover:bg-amber-500 hover:text-stone-950 transition-colors"
                    title="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono font-bold text-sm px-3 text-stone-900 dark:text-amber-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                    className="w-8 h-8 rounded-lg bg-amber-600 text-stone-950 font-bold flex items-center justify-center hover:bg-amber-500 transition-colors"
                    title="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                    addedNotice
                      ? 'bg-emerald-600 text-white'
                      : isOutOfStock
                      ? 'bg-stone-300 dark:bg-stone-800 text-stone-500 dark:text-stone-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 active:scale-95'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add {quantity} to Cart (₹{(item.price * quantity).toLocaleString()})</span>
                    </>
                  )}
                </button>
              </div>

              {/* View Cart Notification */}
              {currentCartQty > 0 && onOpenCart && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenCart();
                  }}
                  className="w-full text-center text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline py-1"
                >
                  View Cart ({currentCartQty} items already in cart) ➔
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
