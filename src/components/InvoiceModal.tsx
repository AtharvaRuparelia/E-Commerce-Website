import React from 'react';
import { Download, Printer, CheckCircle, X, ShieldCheck, Flame } from 'lucide-react';
import { Order } from '../types';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  isDarkMode?: boolean;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, order, isDarkMode = true }) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className={`border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 ${
        isDarkMode 
          ? 'bg-stone-900 border-amber-600/40 text-stone-100' 
          : 'bg-white border-amber-300 text-stone-900'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isDarkMode ? 'text-stone-400 hover:text-white bg-stone-800' : 'text-stone-500 hover:text-stone-900 bg-stone-100'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Invoice Header */}
        <div className={`border-b pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
          isDarkMode ? 'border-stone-800' : 'border-amber-200'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-serif text-2xl font-black ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>BHAVNA POOJA CENTER</span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono border font-bold ${
                isDarkMode ? 'bg-amber-900/60 text-amber-300 border-amber-700' : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}>
                OFFICIAL INVOICE
              </span>
            </div>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              Shri Vile Parle Kelavani Mandal's Usha Pravin Gandhi College Field Project
            </p>
            <p className="text-[11px] text-stone-500">
              Bhaktivedanta Swami Marg, Juhu Scheme, Mumbai 400056 | GSTIN: 27AAAAA0000A1Z5
            </p>
          </div>

          <div className="text-right">
            <span className={`text-xs block ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>Invoice Number</span>
            <span className={`text-lg font-mono font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-800'}`}>{order.orderNumber}</span>
            <span className={`text-[11px] block mt-1 ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Customer & Shipping Info */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs p-4 rounded-2xl border ${
          isDarkMode ? 'bg-stone-950/80 border-stone-800' : 'bg-amber-50/80 border-amber-200'
        }`}>
          <div>
            <span className="text-stone-500 uppercase tracking-wider font-semibold block mb-1">
              Billed To
            </span>
            <p className={`font-bold ${isDarkMode ? 'text-stone-200' : 'text-stone-900'}`}>{order.userName || order.studentName}</p>
            <p className={isDarkMode ? 'text-stone-400' : 'text-stone-600'}>{order.userEmail || order.studentEmail}</p>
            <p className={`mt-1 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>{order.shippingAddress || 'Store Pickup / Express Delivery'}</p>
          </div>

          <div>
            <span className="text-stone-500 uppercase tracking-wider font-semibold block mb-1">
              Payment & Dispatch Status
            </span>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded font-bold border ${
                isDarkMode ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}>
                STATUS: {order.paymentStatus || 'PAID'}
              </span>
              <span className={`px-2.5 py-0.5 rounded font-bold border ${
                isDarkMode ? 'bg-amber-950 text-amber-300 border-amber-800' : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}>
                {order.status.toUpperCase()}
              </span>
            </div>
            <p className={`mt-2 font-mono ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              Gateway ID: {order.razorpayPaymentId || 'PAY_SIMULATED_SUCCESS'}
            </p>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="space-y-3">
          <h4 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
            Purchased Sacred Items Breakdown
          </h4>
          <div className={`overflow-x-auto border rounded-xl ${isDarkMode ? 'border-stone-800' : 'border-amber-200'}`}>
            <table className="w-full text-left text-xs">
              <thead className={`border-b ${
                isDarkMode ? 'bg-stone-950 text-stone-400 border-stone-800' : 'bg-amber-100/70 text-stone-700 border-amber-200'
              }`}>
                <tr>
                  <th className="p-3">Item Description</th>
                  <th className="p-3 text-center">Specs</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-stone-800 text-stone-200' : 'divide-amber-200 text-stone-900'}`}>
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-semibold">
                      {item.menuItem.name}
                    </td>
                    <td className={`p-3 text-center font-mono text-[10px] ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                      {item.menuItem.metalWeightGrams ? `${item.menuItem.metalWeightGrams}g` : ''}{' '}
                      {item.menuItem.dimensionsInches || ''}
                    </td>
                    <td className="p-3 text-center font-bold">{item.quantity}</td>
                    <td className="p-3 text-right font-mono">₹{item.menuItem.price}</td>
                    <td className={`p-3 text-right font-mono font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-800'}`}>
                      ₹{item.menuItem.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Totals */}
        <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 p-4 rounded-2xl border text-xs ${
          isDarkMode ? 'bg-stone-950 border-stone-800' : 'bg-amber-50/90 border-amber-200'
        }`}>
          <div className={`flex items-center gap-2 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
            <ShieldCheck className={`w-5 h-5 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
            <span>Certified Authentic 99.9% Pure Copper Craftsmanship</span>
          </div>

          <div className="space-y-1 text-right w-full sm:w-auto">
            <div className={`flex justify-between sm:justify-end gap-6 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              <span>Subtotal:</span>
              <span className="font-mono">₹{order.subtotal}</span>
            </div>
            <div className={`flex justify-between sm:justify-end gap-6 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              <span>GST / Taxes (18%):</span>
              <span className="font-mono">₹{order.tax}</span>
            </div>
            <div className={`flex justify-between sm:justify-end gap-6 text-sm font-bold pt-1 border-t ${
              isDarkMode ? 'text-amber-300 border-stone-800' : 'text-amber-800 border-amber-200'
            }`}>
              <span>Total Paid Amount:</span>
              <span className="font-mono text-base">₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className={`px-4 py-2 text-xs font-bold rounded-xl ${
              isDarkMode ? 'text-stone-400 hover:text-stone-200 bg-stone-800' : 'text-stone-600 hover:text-stone-900 bg-stone-200'
            }`}
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
