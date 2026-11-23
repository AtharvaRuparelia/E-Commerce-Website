import React, { useState, useEffect } from 'react';
import {
  PackageCheck,
  Truck,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';
import { listenToStudentOrders } from '../../services/orderService';
import { useAuth } from '../../context/AuthContext';
import { InvoiceModal } from '../../components/InvoiceModal';

interface OrderTrackingScreenProps {
  orderId?: string | null;
  onBackToMenu?: () => void;
  isDarkMode?: boolean;
}

export const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({
  orderId,
  onBackToMenu,
  isDarkMode = true
}) => {
  const { firebaseUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  useEffect(() => {
    const unsub = listenToStudentOrders(firebaseUser?.uid || 'guest-user', (fetchedOrders) => {
      setOrders(fetchedOrders);
      if (fetchedOrders.length > 0) {
        if (orderId) {
          const match = fetchedOrders.find((o) => o.id === orderId);
          setSelectedOrder(match || fetchedOrders[0]);
        } else {
          setSelectedOrder(fetchedOrders[0]);
        }
      }
    });
    return unsub;
  }, [firebaseUser, orderId]);

  if (orders.length === 0) {
    return (
      <div className={`w-full min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${
        isDarkMode ? 'bg-[#120F0D] text-stone-100' : 'bg-[#FAF7F2] text-stone-900'
      }`}>
        <div className={`border rounded-3xl p-8 max-w-md text-center space-y-4 shadow-xl ${
          isDarkMode ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-amber-200'
        }`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto border ${
            isDarkMode ? 'bg-amber-950/80 border-amber-600/40 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-800'
          }`}>
            <PackageCheck className="w-8 h-8" />
          </div>
          <h3 className={`font-serif text-2xl font-bold ${
            isDarkMode ? 'text-amber-200' : 'text-stone-900'
          }`}>No Orders Found</h3>
          <p className={`text-xs ${
            isDarkMode ? 'text-stone-400' : 'text-stone-600'
          }`}>
            You have not placed any copper Yantra orders yet. Select items from our catalog to receive live delivery status updates!
          </p>
          {onBackToMenu && (
            <button
              onClick={onBackToMenu}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition-all shadow"
            >
              Browse Catalog ➔
            </button>
          )}
        </div>
      </div>
    );
  }

  const currentOrder = selectedOrder || orders[0];

  const statusSteps: { status: OrderStatus; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      status: 'Placed',
      label: 'Order Placed',
      desc: 'Order verified & payment confirmed',
      icon: <Clock className="w-4 h-4" />
    },
    {
      status: 'Packed',
      label: 'Shop Packed',
      desc: 'Cleaned, ritual checked & securely boxed',
      icon: <PackageCheck className="w-4 h-4" />
    },
    {
      status: 'Dispatched',
      label: 'In Transit',
      desc: 'Handed to courier for doorstep delivery',
      icon: <Truck className="w-4 h-4" />
    },
    {
      status: 'Delivered',
      label: 'Delivered',
      desc: 'Successfully delivered to customer',
      icon: <CheckCircle2 className="w-4 h-4" />
    }
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'Placed':
        return 0;
      case 'Packed':
      case 'Preparing':
        return 1;
      case 'Dispatched':
      case 'Ready':
        return 2;
      case 'Delivered':
      case 'Completed':
        return 3;
      default:
        return 0;
    }
  };

  const currentStepIdx = getStepIndex(currentOrder.status);

  return (
    <div className={`w-full min-h-screen pb-16 pt-6 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#120F0D] text-stone-100' : 'bg-[#FAF7F2] text-stone-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
          isDarkMode ? 'border-stone-800' : 'border-amber-200'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono px-2 py-0.5 rounded border font-bold ${
                isDarkMode ? 'bg-amber-950 text-amber-300 border-amber-800' : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}>
                LIVE ORDER TRACKING
              </span>
              <span className={`text-xs font-mono ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                ID: {currentOrder.orderNumber}
              </span>
            </div>
            <h1 className={`text-2xl font-serif font-bold mt-1 ${
              isDarkMode ? 'text-amber-200' : 'text-stone-900'
            }`}>
              Customer Order & Delivery Status
            </h1>
          </div>

          <button
            onClick={() => setInvoiceModalOpen(true)}
            className={`self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-colors shadow-sm ${
              isDarkMode ? 'bg-stone-900 hover:bg-stone-800 text-amber-300 border-amber-600/40' : 'bg-white hover:bg-amber-50 text-amber-900 border-amber-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Download PDF Invoice</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Delivery Progress Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Timeline Card */}
            <div className={`border rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl ${
              isDarkMode ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-amber-200 text-stone-900'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-xs block ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>Current Status</span>
                  <span className={`text-xl font-bold font-serif flex items-center gap-2 ${
                    isDarkMode ? 'text-amber-400' : 'text-amber-700'
                  }`}>
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    {currentOrder.status.toUpperCase()}
                  </span>
                </div>

                <div className="text-right">
                  <span className={`text-xs block ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>Pickup / Verification Code</span>
                  <span className={`text-2xl font-mono font-black px-3 py-1 rounded-xl border inline-block ${
                    isDarkMode ? 'text-amber-300 bg-stone-950 border-stone-800' : 'text-amber-800 bg-amber-50 border-amber-300'
                  }`}>
                    {currentOrder.pickupOtp || '8942'}
                  </span>
                </div>
              </div>

              {/* Progress Bar Timeline */}
              <div className="relative py-4">
                <div className={`overflow-hidden h-2 mb-8 text-xs flex rounded border ${
                  isDarkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-200 border-amber-200'
                }`}>
                  <div
                    style={{ width: `${((currentStepIdx + 1) / 4) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-amber-600 to-yellow-500 transition-all duration-500"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  {statusSteps.map((step, idx) => {
                    const isPassed = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;

                    return (
                      <div key={step.status} className="flex flex-col items-center space-y-2">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                            isPassed
                              ? 'bg-amber-600 border-amber-400 text-stone-950 shadow-lg'
                              : isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-600' : 'bg-stone-100 border-stone-300 text-stone-400'
                          }`}
                        >
                          {step.icon}
                        </div>
                        <div>
                          <span
                            className={`text-xs font-bold block ${
                              isCurrent 
                                ? (isDarkMode ? 'text-amber-300' : 'text-amber-800') 
                                : isPassed 
                                ? (isDarkMode ? 'text-stone-200' : 'text-stone-800') 
                                : (isDarkMode ? 'text-stone-500' : 'text-stone-400')
                            }`}
                          >
                            {step.label}
                          </span>
                          <span className={`text-[10px] hidden sm:block ${isDarkMode ? 'text-stone-500' : 'text-stone-500'}`}>
                            {step.desc}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Shipping Address & Dispatch Note */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t text-xs ${
                isDarkMode ? 'border-stone-800' : 'border-amber-200'
              }`}>
                <div className={`flex items-start gap-2 p-3 rounded-2xl border ${
                  isDarkMode ? 'bg-stone-950/80 border-stone-800' : 'bg-amber-50/60 border-amber-200'
                }`}>
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className={`block font-semibold ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>Delivery Address</span>
                    <span className={isDarkMode ? 'text-stone-200' : 'text-stone-800'}>
                      {currentOrder.shippingAddress || '402 Vile Parle West, Juhu Scheme, Mumbai 400056'}
                    </span>
                  </div>
                </div>

                <div className={`flex items-start gap-2 p-3 rounded-2xl border ${
                  isDarkMode ? 'bg-stone-950/80 border-stone-800' : 'bg-amber-50/60 border-amber-200'
                }`}>
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className={`block font-semibold ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>Quality & Payment Verification</span>
                    <span className={isDarkMode ? 'text-stone-200' : 'text-stone-800'}>
                      Payment Status: <strong className={isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}>{currentOrder.paymentStatus || 'PAID'}</strong> | Direct-from-shop warranty applied.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items Listing */}
            <div className={`border rounded-3xl p-6 space-y-4 shadow-xl ${
              isDarkMode ? 'bg-stone-900/90 border-stone-800 text-stone-100' : 'bg-white border-amber-200 text-stone-900'
            }`}>
              <h3 className={`font-serif font-bold text-sm border-b pb-3 ${
                isDarkMode ? 'text-amber-200 border-stone-800' : 'text-stone-900 border-amber-200'
              }`}>
                Order Items ({currentOrder.items.length})
              </h3>
              <div className={`divide-y ${isDarkMode ? 'divide-stone-800' : 'divide-amber-200'}`}>
                {currentOrder.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.menuItem.imageUrl}
                        alt={item.menuItem.name}
                        className={`w-12 h-12 rounded-xl object-cover border ${
                          isDarkMode ? 'border-stone-800' : 'border-amber-200'
                        }`}
                      />
                      <div>
                        <h4 className={`text-xs font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>{item.menuItem.name}</h4>
                        <p className={`text-[11px] font-mono ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                          Qty: {item.quantity} | {item.menuItem.metalWeightGrams ? `${item.menuItem.metalWeightGrams}g` : ''}{' '}
                          {item.menuItem.dimensionsInches || ''}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-mono font-bold ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                      ₹{item.menuItem.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Order History List */}
          <div className="space-y-4">
            <h3 className={`font-serif font-bold text-sm ${isDarkMode ? 'text-stone-200' : 'text-stone-900'}`}>Past Order History</h3>
            <div className="space-y-3">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => setSelectedOrder(ord)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    currentOrder.id === ord.id
                      ? isDarkMode ? 'bg-amber-950/40 border-amber-600/60 shadow-lg' : 'bg-amber-100 border-amber-400 shadow-md'
                      : isDarkMode ? 'bg-stone-900/80 border-stone-800 hover:border-stone-700' : 'bg-white border-amber-200 hover:border-amber-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-mono font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-800'}`}>{ord.orderNumber}</span>
                    <span className={`text-[10px] ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className={`font-medium ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}>₹{ord.total}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      isDarkMode ? 'bg-stone-950 text-amber-400 border-stone-800' : 'bg-amber-50 text-amber-800 border-amber-300'
                    }`}>
                      {ord.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Generator Modal */}
      <InvoiceModal
        isOpen={invoiceModalOpen}
        onClose={() => setInvoiceModalOpen(false)}
        order={currentOrder}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};
