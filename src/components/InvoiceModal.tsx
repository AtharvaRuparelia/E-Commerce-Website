import React from 'react';
import { Download, Printer, CheckCircle, X, ShieldCheck, Flame } from 'lucide-react';
import { Order } from '../types';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-stone-900 border border-amber-300 dark:border-amber-600/40 text-stone-900 dark:text-stone-100 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-stone-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Invoice Header */}
        <div className="border-b border-amber-200 dark:border-stone-800 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-black text-amber-800 dark:text-amber-400">BHAVNA POOJA CENTER</span>
              <span className="text-[10px] bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded font-mono border border-amber-300 dark:border-amber-700 font-bold">
                OFFICIAL INVOICE
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              Shri Vile Parle Kelavani Mandal's Usha Pravin Gandhi College Field Project
            </p>
            <p className="text-[11px] text-stone-500">
              Bhaktivedanta Swami Marg, Juhu Scheme, Mumbai 400056 | GSTIN: 27AAAAA0000A1Z5
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-stone-500 dark:text-stone-400 block">Invoice Number</span>
            <span className="text-lg font-mono font-bold text-amber-800 dark:text-amber-300">{order.orderNumber}</span>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-1">
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Customer & Shipping Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-amber-50/80 dark:bg-stone-950/80 p-4 rounded-2xl border border-amber-200 dark:border-stone-800">
          <div>
            <span className="text-stone-500 dark:text-stone-500 uppercase tracking-wider font-semibold block mb-1">
              Billed To
            </span>
            <p className="font-bold text-stone-900 dark:text-stone-200">{order.userName || order.studentName}</p>
            <p className="text-stone-600 dark:text-stone-400">{order.userEmail || order.studentEmail}</p>
            <p className="text-stone-600 dark:text-stone-400 mt-1">{order.shippingAddress || 'Store Pickup / Express Delivery'}</p>
          </div>

          <div>
            <span className="text-stone-500 dark:text-stone-500 uppercase tracking-wider font-semibold block mb-1">
              Payment & Dispatch Status
            </span>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded font-bold border border-emerald-300 dark:border-emerald-800">
                STATUS: {order.paymentStatus || 'PAID'}
              </span>
              <span className="bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 px-2.5 py-0.5 rounded font-bold border border-amber-300 dark:border-amber-800">
                {order.status.toUpperCase()}
              </span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 mt-2 font-mono">
              Gateway ID: {order.razorpayPaymentId || 'PAY_SIMULATED_SUCCESS'}
            </p>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase text-stone-600 dark:text-stone-400 tracking-wider">
            Purchased Sacred Items Breakdown
          </h4>
          <div className="overflow-x-auto border border-amber-200 dark:border-stone-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-amber-100/70 dark:bg-stone-950 text-stone-700 dark:text-stone-400 border-b border-amber-200 dark:border-stone-800">
                <tr>
                  <th className="p-3">Item Description</th>
                  <th className="p-3 text-center">Specs</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-200 dark:divide-stone-800 text-stone-900 dark:text-stone-200">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-semibold text-stone-900 dark:text-stone-100">
                      {item.menuItem.name}
                    </td>
                    <td className="p-3 text-center text-stone-500 dark:text-stone-400 font-mono text-[10px]">
                      {item.menuItem.metalWeightGrams ? `${item.menuItem.metalWeightGrams}g` : ''}{' '}
                      {item.menuItem.dimensionsInches || ''}
                    </td>
                    <td className="p-3 text-center font-bold">{item.quantity}</td>
                    <td className="p-3 text-right font-mono">₹{item.menuItem.price}</td>
                    <td className="p-3 text-right font-mono font-bold text-amber-800 dark:text-amber-300">
                      ₹{item.menuItem.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Totals */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-amber-50/90 dark:bg-stone-950 p-4 rounded-2xl border border-amber-200 dark:border-stone-800 text-xs">
          <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
            <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span>Certified Authentic 99.9% Pure Copper Craftsmanship</span>
          </div>

          <div className="space-y-1 text-right w-full sm:w-auto">
            <div className="flex justify-between sm:justify-end gap-6 text-stone-600 dark:text-stone-400">
              <span>Subtotal:</span>
              <span className="font-mono">₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between sm:justify-end gap-6 text-stone-600 dark:text-stone-400">
              <span>GST / Taxes (18%):</span>
              <span className="font-mono">₹{order.tax}</span>
            </div>
            <div className="flex justify-between sm:justify-end gap-6 text-sm font-bold text-amber-800 dark:text-amber-300 pt-1 border-t border-amber-200 dark:border-stone-800">
              <span>Total Paid Amount:</span>
              <span className="font-mono text-base">₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 bg-stone-200 dark:bg-stone-800 rounded-xl"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white dark:text-stone-950 rounded-xl flex items-center gap-2 shadow"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
};
