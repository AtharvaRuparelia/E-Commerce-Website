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
}

export const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({
  orderId,
  onBackToMenu
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
      <div className="w-full bg-[#120F0D] text-stone-100 min-h-screen flex items-center justify-center p-6">
        <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-8 max-w-md text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 bg-amber-950/80 border border-amber-600/40 rounded-full flex items-center justify-center mx-auto text-amber-400">
            <PackageCheck className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-amber-200">No Orders Found</h3>
          <p className="text-xs text-stone-400">
            You have not placed any copper Yantra orders yet. Select items from our catalog to receive live delivery status updates!
          </p>
          {onBackToMenu && (
            <button
              onClick={onBackToMenu}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition-all shadow"
            >
              Browse Yantra Catalog ➔
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
    <div className="w-full bg-[#120F0D] text-stone-100 min-h-screen pb-16 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-950 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-800">
                LIVE ORDER TRACKING
              </span>
              <span className="text-xs text-stone-400 font-mono">ID: {currentOrder.orderNumber}</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-amber-200 mt-1">
              Customer Order & Delivery Status
            </h1>
          </div>

          <button
            onClick={() => setInvoiceModalOpen(true)}
            className="self-start sm:self-auto px-4 py-2 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-600/40 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Download PDF Invoice</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Delivery Progress Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Timeline Card */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 block">Current Status</span>
                  <span className="text-xl font-bold font-serif text-amber-400 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    {currentOrder.status.toUpperCase()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-stone-400 block">Pickup / Verification Code</span>
                  <span className="text-2xl font-mono font-black text-amber-300 bg-stone-950 px-3 py-1 rounded-xl border border-stone-800 inline-block">
                    {currentOrder.pickupOtp || '8942'}
                  </span>
                </div>
              </div>

              {/* Progress Bar Timeline */}
              <div className="relative py-4">
                <div className="overflow-hidden h-2 mb-8 text-xs flex rounded bg-stone-950 border border-stone-800">
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
                              : 'bg-stone-950 border-stone-800 text-stone-600'
                          }`}
                        >
                          {step.icon}
                        </div>
                        <div>
                          <span
                            className={`text-xs font-bold block ${
                              isCurrent ? 'text-amber-300' : isPassed ? 'text-stone-200' : 'text-stone-500'
                            }`}
                          >
                            {step.label}
                          </span>
                          <span className="text-[10px] text-stone-500 hidden sm:block">
                            {step.desc}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Shipping Address & Dispatch Note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-800 text-xs">
                <div className="flex items-start gap-2 bg-stone-950/80 p-3 rounded-2xl border border-stone-800">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400 block font-semibold">Delivery Address</span>
                    <span className="text-stone-200">
                      {currentOrder.shippingAddress || '402 Vile Parle West, Juhu Scheme, Mumbai 400056'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-stone-950/80 p-3 rounded-2xl border border-stone-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400 block font-semibold">Quality & Payment Verification</span>
                    <span className="text-stone-200">
                      Payment Status: <strong className="text-emerald-400">{currentOrder.paymentStatus || 'PAID'}</strong> | Direct-from-factory warranty applied.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items Listing */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="font-serif font-bold text-amber-200 text-sm border-b border-stone-800 pb-3">
                Order Items ({currentOrder.items.length})
              </h3>
              <div className="divide-y divide-stone-800">
                {currentOrder.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.menuItem.imageUrl}
                        alt={item.menuItem.name}
                        className="w-12 h-12 rounded-xl object-cover border border-stone-800"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-stone-100">{item.menuItem.name}</h4>
                        <p className="text-[11px] text-stone-400 font-mono">
                          Qty: {item.quantity} | {item.menuItem.metalWeightGrams ? `${item.menuItem.metalWeightGrams}g` : ''}{' '}
                          {item.menuItem.dimensionsInches || ''}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      ₹{item.menuItem.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Order History List */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-stone-200 text-sm">Past Order History</h3>
            <div className="space-y-3">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => setSelectedOrder(ord)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    currentOrder.id === ord.id
                      ? 'bg-amber-950/40 border-amber-600/60 shadow-lg'
                      : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-amber-300">{ord.orderNumber}</span>
                    <span className="text-[10px] text-stone-400">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-stone-300 font-medium">₹{ord.total}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-950 text-amber-400 border border-stone-800">
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
      />
    </div>
  );
};
