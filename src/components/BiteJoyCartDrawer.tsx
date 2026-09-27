import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';
import { Order } from '../types';
import {
  ShoppingBag,
  X,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  ShieldCheck,
  MapPin,
  CheckCircle,
  Smartphone,
  Landmark,
  Banknote
} from 'lucide-react';

interface BiteJoyCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
  onRequireAuth: () => void;
}

export const BiteJoyCartDrawer: React.FC<BiteJoyCartDrawerProps> = ({
  isOpen,
  onClose,
  onOrderSuccess,
  onRequireAuth
}) => {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, tax, total } = useCart();
  const { firebaseUser, profile } = useAuth();
  const [shippingAddress, setShippingAddress] = useState(
    profile?.address || '402 Vile Parle West, Juhu Scheme, Mumbai 400056'
  );
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Payment Method State
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  if (!isOpen) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);
    try {
      const uid = firebaseUser?.uid || 'guest-user';
      const cName = profile?.name || 'Valued Customer';
      const cEmail = profile?.email || firebaseUser?.email || 'customer@bhavnapooja.com';

      let methodLabel = 'Online Payment';
      let payStatus = 'Paid';

      if (paymentMode === 'upi') {
        methodLabel = `UPI (${upiId ? upiId : 'GPay / PhonePe / Paytm'})`;
      } else if (paymentMode === 'card') {
        const last4 = cardNumber.length >= 4 ? cardNumber.slice(-4) : '4242';
        methodLabel = `Credit/Debit Card (*${last4})`;
      } else if (paymentMode === 'netbanking') {
        methodLabel = `Net Banking (${selectedBank})`;
      } else if (paymentMode === 'cod') {
        methodLabel = 'Cash on Delivery (COD)';
        payStatus = 'Pending (Pay on Delivery)';
      }

      const order = await createOrder(
        uid,
        cName,
        cEmail,
        items,
        subtotal,
        tax,
        total,
        shippingAddress,
        specialInstructions,
        {
          paymentMethod: methodLabel,
          paymentStatus: payStatus,
          razorpayPaymentId: paymentMode === 'cod' ? 'COD-UNPAID' : `pay_BPC_${Math.floor(10000000 + Math.random() * 90000000)}`
        }
      );

      clearCart();
      onClose();
      onOrderSuccess(order);
    } catch (err: any) {
      alert('Checkout failed: ' + (err.message || 'Please try again.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-stone-900 border-l border-amber-600/40 text-stone-100 h-full flex flex-col justify-between p-6 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-amber-200 text-lg">Your Shopping Cart</h3>
            <span className="text-xs bg-amber-950 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-800">
              {items.length} Items
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white bg-stone-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto" />
              <p className="text-xs text-stone-400">Your shopping cart is currently empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.menuItem.id}
                className="bg-stone-950 p-3.5 rounded-2xl border border-stone-800 flex items-center justify-between gap-3 text-xs"
              >
                <img
                  src={item.menuItem.imageUrl}
                  alt={item.menuItem.name}
                  className="w-14 h-14 rounded-xl object-cover border border-stone-800 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-stone-100 truncate">{item.menuItem.name}</h4>
                  <span className="text-stone-400 font-mono text-[10px] block">
                    {item.menuItem.metalWeightGrams ? `${item.menuItem.metalWeightGrams}g` : ''}{' '}
                    {item.menuItem.dimensionsInches || ''}
                  </span>
                  <span className="text-amber-400 font-mono font-bold">₹{item.menuItem.price}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-stone-900 border border-stone-800 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                      className="p-1 text-stone-400 hover:text-stone-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono font-bold px-1.5 text-amber-300">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                      className="p-1 text-stone-400 hover:text-stone-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.menuItem.id)}
                    className="p-1 text-stone-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Multi-step Checkout Controls */}
        {items.length > 0 && (
          <form onSubmit={handleCheckout} className="space-y-4 text-xs pt-4 border-t border-stone-800 overflow-y-auto max-h-[50vh]">
            {/* Delivery Address */}
            <div className="space-y-1">
              <label className="font-semibold text-stone-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Shipping Delivery Address</span>
              </label>
              <input
                type="text"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter complete delivery address"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            {/* Special Instructions */}
            <div className="space-y-1">
              <label className="font-semibold text-stone-300">Ritual / Order Instructions</label>
              <input
                type="text"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="E.g., Consecration request, gift wrapping..."
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Select Payment Method */}
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <label className="font-bold text-amber-300 flex items-center gap-1">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>Select Payment Method</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                {/* UPI Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMode('upi')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    paymentMode === 'upi'
                      ? 'bg-amber-950/80 border-amber-500 text-amber-200 font-bold'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-[11px]">UPI / QR Code</span>
                </button>

                {/* Card Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMode('card')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    paymentMode === 'card'
                      ? 'bg-amber-950/80 border-amber-500 text-amber-200 font-bold'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-[11px]">Credit / Debit Card</span>
                </button>

                {/* Net Banking Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMode('netbanking')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    paymentMode === 'netbanking'
                      ? 'bg-amber-950/80 border-amber-500 text-amber-200 font-bold'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <Landmark className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-[11px]">Net Banking</span>
                </button>

                {/* COD Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMode('cod')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    paymentMode === 'cod'
                      ? 'bg-amber-950/80 border-amber-500 text-amber-200 font-bold'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px]">Cash on Delivery</span>
                </button>
              </div>

              {/* Payment Details Sub-Inputs */}
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 space-y-2 text-[11px]">
                {paymentMode === 'upi' && (
                  <div className="space-y-1.5">
                    <span className="text-stone-300 font-semibold block">Pay via GPay, PhonePe, Paytm, or BHIM</span>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="Enter UPI ID (e.g. name@okaxis) [Optional]"
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-stone-200 focus:outline-none focus:border-amber-500"
                    />
                    <p className="text-[10px] text-stone-500">Scan QR code or approve notification in your UPI app upon ordering.</p>
                  </div>
                )}

                {paymentMode === 'card' && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      maxLength={16}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card Number (16 digits)"
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="bg-stone-900 border border-stone-800 rounded-lg p-2 text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="bg-stone-900 border border-stone-800 rounded-lg p-2 text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>
                )}

                {paymentMode === 'netbanking' && (
                  <div className="space-y-1.5">
                    <span className="text-stone-300 font-semibold block">Select Your Bank:</span>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-amber-300 focus:outline-none focus:border-amber-500 font-medium"
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="State Bank of India">State Bank of India (SBI)</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      <option value="Bank of Baroda">Bank of Baroda</option>
                    </select>
                  </div>
                )}

                {paymentMode === 'cod' && (
                  <div className="text-stone-300 space-y-1">
                    <span className="font-semibold text-emerald-400 block">✓ Cash on Delivery Selected</span>
                    <p className="text-[10px] text-stone-400">
                      You can pay via Cash or UPI directly to our delivery executive when your parcel arrives. Zero extra COD charge.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Summary Totals */}
            <div className="bg-stone-950 p-3.5 rounded-2xl border border-stone-800 space-y-1.5">
              <div className="flex justify-between text-stone-400">
                <span>Items Subtotal:</span>
                <span className="font-mono text-stone-200">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>GST & Taxes (18%):</span>
                <span className="font-mono text-stone-200">₹{tax}</span>
              </div>
              <div className="flex justify-between text-amber-300 font-bold pt-1 border-t border-stone-800 text-sm">
                <span>Total Amount:</span>
                <span className="font-mono text-base">₹{total}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-black rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 text-sm"
            >
              <CreditCard className="w-4 h-4" />
              <span>
                {submitting
                  ? 'Processing Order...'
                  : paymentMode === 'cod'
                  ? 'Confirm Cash on Delivery Order'
                  : `Pay ₹${total} & Place Order`}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

