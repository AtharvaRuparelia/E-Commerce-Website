import React, { useState, useEffect } from 'react';
import {
  Factory,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  Boxes,
  ClipboardList,
  ShieldCheck,
  Flame,
  UserCheck,
  Calendar
} from 'lucide-react';
import { MenuItem, FactoryBatch } from '../../types';
import { getLocalItems, listenToMenuItems } from '../../services/menuService';
import { logFactoryBatchEntry, listenToFactoryBatches } from '../../services/factoryService';
import { useAuth } from '../../context/AuthContext';

interface FactoryBatchPortalProps {
  isDarkMode?: boolean;
}

export const FactoryBatchPortal: React.FC<FactoryBatchPortalProps> = ({ isDarkMode = true }) => {
  const { profile } = useAuth();
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [batches, setBatches] = useState<FactoryBatch[]>([]);

  // Form state
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(20);
  const [supervisorName, setSupervisorName] = useState<string>(
    profile?.name || 'Atharva Ruparelia (Shop Supervisor)'
  );
  const [notes, setNotes] = useState<string>('');

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubItems = listenToMenuItems((items) => {
      setProducts(items);
      if (items.length > 0 && !selectedProductId) {
        setSelectedProductId(items[0].id);
      }
    });
    const unsubBatches = listenToFactoryBatches((batchList) => {
      setBatches(batchList);
    });

    return () => {
      unsubItems();
      unsubBatches();
    };
  }, [selectedProductId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId) {
      setErrorMessage('Please select a Yantra product');
      return;
    }
    if (quantity <= 0) {
      setErrorMessage('Production quantity must be greater than 0');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const newBatch = await logFactoryBatchEntry(
        selectedProductId,
        quantity,
        supervisorName,
        notes
      );
      setSuccessMessage(
        `Batch ${newBatch.batchCode} logged successfully! Added ${quantity} units to live warehouse inventory.`
      );
      setNotes('');
      setQuantity(20);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to log batch entry');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  return (
    <div className={`w-full min-h-screen pb-16 pt-6 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#120F0D] text-stone-100' : 'bg-[#FAF7F2] text-stone-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Banner */}
        <div className={`border rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl ${
          isDarkMode 
            ? 'bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-amber-600/40 text-stone-100' 
            : 'bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 border-amber-300 text-stone-900'
        }`}>
          <div className="space-y-2 text-center md:text-left">
            <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border ${
              isDarkMode 
                ? 'bg-amber-900/60 border-amber-600/40 text-amber-300' 
                : 'bg-amber-200/80 border-amber-300 text-amber-950'
            }`}>
              <Factory className="w-3.5 h-3.5" />
              <span>Shop Production & Live Inventory Synchronization</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold font-serif ${isDarkMode ? 'text-amber-200' : 'text-stone-900'}`}>
              Factory Batch Production Portal
            </h1>
            <p className={`text-xs max-w-xl ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              Dedicated portal for manufacturing personnel to enter finished copper Yantra production batches, instantly updating central warehouse inventory in real time.
            </p>
          </div>

          <div className={`flex items-center gap-4 p-4 rounded-2xl border ${
            isDarkMode ? 'bg-stone-950/80 border-stone-800' : 'bg-white/90 border-amber-200 shadow-sm'
          }`}>
            <div className={`text-center px-3 border-r ${isDarkMode ? 'border-stone-800' : 'border-amber-200'}`}>
              <span className={`block text-2xl font-black ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>{batches.length}</span>
              <span className={`text-[10px] uppercase tracking-wider font-semibold ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>Logged Batches</span>
            </div>
            <div className="text-center px-3">
              <span className={`block text-2xl font-black ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {products.reduce((acc, curr) => acc + (curr.stockCountRemaining || 0), 0)}
              </span>
              <span className={`text-[10px] uppercase tracking-wider font-semibold ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>Total Stock</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Log Batch Entry Form */}
          <div className={`lg:col-span-1 border rounded-3xl p-6 space-y-6 shadow-xl ${
            isDarkMode ? 'bg-stone-900/90 border-stone-800 text-stone-100' : 'bg-white border-amber-200 text-stone-900'
          }`}>
            <div className={`border-b pb-3 flex items-center gap-2 font-serif font-bold text-base ${
              isDarkMode ? 'border-stone-800 text-amber-300' : 'border-amber-200 text-amber-900'
            }`}>
              <PlusCircle className={`w-5 h-5 ${isDarkMode ? 'text-amber-500' : 'text-amber-600'}`} />
              <span>Log New Manufacturing Batch</span>
            </div>

            {successMessage && (
              <div className={`p-4 rounded-2xl text-xs flex items-start gap-2 animate-fadeIn border ${
                isDarkMode 
                  ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200' 
                  : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}>
                <CheckCircle2 className={`w-5 h-5 shrink-0 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className={`p-4 rounded-2xl text-xs flex items-start gap-2 border ${
                isDarkMode 
                  ? 'bg-rose-950/80 border-rose-800 text-rose-200' 
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}>
                <AlertTriangle className={`w-5 h-5 shrink-0 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Product Selection */}
              <div className="space-y-1.5">
                <label className={`font-semibold ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}>Select Copper Yantra Item</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 font-medium ${
                    isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-200' : 'bg-amber-50/50 border-amber-300 text-stone-900'
                  }`}
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Current Stock: {p.stockCountRemaining ?? 0})
                    </option>
                  ))}
                </select>
              </div>

              {selectedProduct && (
                <div className={`p-3 rounded-2xl border space-y-1 ${
                  isDarkMode ? 'bg-stone-950/80 border-stone-800/80' : 'bg-amber-50/80 border-amber-200'
                }`}>
                  <div className="flex justify-between text-[11px]">
                    <span className={isDarkMode ? 'text-stone-400' : 'text-stone-500'}>Metal Specifications:</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-amber-300' : 'text-amber-900'}`}>
                      {selectedProduct.metalWeightGrams ? `${selectedProduct.metalWeightGrams}g` : ''}{' '}
                      {selectedProduct.dimensionsInches || ''}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className={isDarkMode ? 'text-stone-400' : 'text-stone-500'}>Current Warehouse Stock:</span>
                    <span className={`font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      {selectedProduct.stockCountRemaining ?? 0} Units
                    </span>
                  </div>
                </div>
              )}

              {/* Quantity Produced */}
              <div className="space-y-1.5">
                <label className={`font-semibold ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}>Finished Batch Quantity (Units)</label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className={`w-full border rounded-xl px-3 py-2 font-mono font-bold focus:outline-none focus:border-amber-500 ${
                    isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-200' : 'bg-amber-50/50 border-amber-300 text-stone-900'
                  }`}
                />
              </div>

              {/* Supervisor Name / ID */}
              <div className="space-y-1.5">
                <label className={`font-semibold ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}>Supervisor / Artisan Lead</label>
                <input
                  type="text"
                  value={supervisorName}
                  onChange={(e) => setSupervisorName(e.target.value)}
                  placeholder="Supervisor Name or SAP ID"
                  className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 ${
                    isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-200' : 'bg-amber-50/50 border-amber-300 text-stone-900'
                  }`}
                />
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className={`font-semibold ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}>Batch Etching & Polish Notes (Optional)</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. 0.8mm Acid Etching complete, protective lacquer coating applied."
                  className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 ${
                    isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-200' : 'bg-amber-50/50 border-amber-300 text-stone-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white dark:text-stone-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-50"
              >
                <Boxes className="w-4 h-4" />
                <span>{submitting ? 'Logging Batch...' : 'Log Batch & Sync Inventory'}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Recent Factory Production Batches */}
          <div className={`lg:col-span-2 border rounded-3xl p-6 space-y-6 shadow-xl ${
            isDarkMode ? 'bg-stone-900/90 border-stone-800 text-stone-100' : 'bg-white border-amber-200 text-stone-900'
          }`}>
            <div className={`border-b pb-3 flex items-center justify-between ${
              isDarkMode ? 'border-stone-800' : 'border-amber-200'
            }`}>
              <div className={`flex items-center gap-2 font-serif font-bold text-base ${
                isDarkMode ? 'text-amber-200' : 'text-stone-900'
              }`}>
                <ClipboardList className={`w-5 h-5 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                <span>Recent Production Logs</span>
              </div>
              <span className={`text-xs font-mono ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>Real-time Factory Ledger</span>
            </div>

            <div className="space-y-4">
              {batches.map((batch) => {
                const product = products.find((p) => p.id === batch.menuItemId);
                return (
                  <div
                    key={batch.id}
                    className={`border rounded-2xl p-4 space-y-3 shadow-md ${
                      isDarkMode ? 'bg-stone-950/90 border-stone-800' : 'bg-amber-50/60 border-amber-200'
                    }`}
                  >
                    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2 ${
                      isDarkMode ? 'border-stone-800/80' : 'border-amber-200/80'
                    }`}>
                      <div>
                        <span className={`font-mono font-black text-sm ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>{batch.batchCode}</span>
                        <h4 className="font-bold text-xs">
                          {product ? product.name : batch.menuItemId}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-black px-3 py-1 rounded-xl text-xs border ${
                          isDarkMode ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}>
                          +{batch.quantityProduced} Units Added
                        </span>
                      </div>
                    </div>

                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] ${
                      isDarkMode ? 'text-stone-400' : 'text-stone-600'
                    }`}>
                      <div className="flex items-center gap-1.5">
                        <UserCheck className={`w-3.5 h-3.5 shrink-0 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                        <span>Supervisor: <strong className={isDarkMode ? 'text-stone-200' : 'text-stone-900'}>{batch.supervisorName}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className={`w-3.5 h-3.5 shrink-0 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                        <span>Logged At: <strong className={`font-mono ${isDarkMode ? 'text-stone-200' : 'text-stone-900'}`}>{new Date(batch.createdAt).toLocaleString()}</strong></span>
                      </div>
                    </div>

                    {batch.notes && (
                      <p className={`text-[11px] italic p-2 rounded-xl border ${
                        isDarkMode ? 'bg-stone-900 text-stone-400 border-stone-800' : 'bg-white text-stone-600 border-amber-200'
                      }`}>
                        "{batch.notes}"
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
