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

export const FactoryBatchPortal: React.FC = () => {
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
    <div className="w-full min-h-screen pb-16 pt-6 transition-colors duration-300 bg-amber-50/60 text-stone-900 dark:bg-[#120F0D] dark:text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 dark:from-amber-950 dark:via-stone-900 dark:to-amber-950 border border-amber-300 dark:border-amber-600/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-200/80 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-600/40 text-amber-950 dark:text-amber-300 text-xs font-semibold px-3 py-1 rounded-full">
              <Factory className="w-3.5 h-3.5" />
              <span>Shop Production & Live Inventory Synchronization</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-amber-200">
              Factory Batch Production Portal
            </h1>
            <p className="text-xs text-stone-600 dark:text-stone-400 max-w-xl">
              Dedicated portal for manufacturing personnel to enter finished copper Yantra production batches, instantly updating central warehouse inventory in real time.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/90 dark:bg-stone-950/80 p-4 rounded-2xl border border-amber-200 dark:border-stone-800 shadow-sm">
            <div className="text-center px-3 border-r border-amber-200 dark:border-stone-800">
              <span className="block text-2xl font-black text-amber-700 dark:text-amber-400">{batches.length}</span>
              <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wider font-semibold">Logged Batches</span>
            </div>
            <div className="text-center px-3">
              <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {products.reduce((acc, curr) => acc + (curr.stockCountRemaining || 0), 0)}
              </span>
              <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wider font-semibold">Total Stock</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Log Batch Entry Form */}
          <div className="lg:col-span-1 bg-white/95 dark:bg-stone-900/90 border border-amber-200 dark:border-stone-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="border-b border-amber-200 dark:border-stone-800 pb-3 flex items-center gap-2 text-amber-900 dark:text-amber-300 font-serif font-bold text-base">
              <PlusCircle className="w-5 h-5 text-amber-600 dark:text-amber-500" />
              <span>Log New Manufacturing Batch</span>
            </div>

            {successMessage && (
              <div className="bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 p-4 rounded-2xl text-xs flex items-start gap-2 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 p-4 rounded-2xl text-xs flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Product Selection */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700 dark:text-stone-300">Select Copper Yantra Item</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-amber-50/50 dark:bg-stone-950 border border-amber-300 dark:border-stone-800 rounded-xl px-3 py-2 text-stone-900 dark:text-stone-200 focus:outline-none focus:border-amber-500 font-medium"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Current Stock: {p.stockCountRemaining ?? 0})
                    </option>
                  ))}
                </select>
              </div>

              {selectedProduct && (
                <div className="bg-amber-50/80 dark:bg-stone-950/80 p-3 rounded-2xl border border-amber-200 dark:border-stone-800/80 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-500 dark:text-stone-400">Metal Specifications:</span>
                    <span className="font-semibold text-amber-900 dark:text-amber-300">
                      {selectedProduct.metalWeightGrams ? `${selectedProduct.metalWeightGrams}g` : ''}{' '}
                      {selectedProduct.dimensionsInches || ''}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-500 dark:text-stone-400">Current Warehouse Stock:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {selectedProduct.stockCountRemaining ?? 0} Units
                    </span>
                  </div>
                </div>
              )}

              {/* Quantity Produced */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700 dark:text-stone-300">Finished Batch Quantity (Units)</label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-amber-50/50 dark:bg-stone-950 border border-amber-300 dark:border-stone-800 rounded-xl px-3 py-2 text-stone-900 dark:text-stone-200 font-mono font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Supervisor Name / ID */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700 dark:text-stone-300">Supervisor / Artisan Lead</label>
                <input
                  type="text"
                  value={supervisorName}
                  onChange={(e) => setSupervisorName(e.target.value)}
                  placeholder="Supervisor Name or SAP ID"
                  className="w-full bg-amber-50/50 dark:bg-stone-950 border border-amber-300 dark:border-stone-800 rounded-xl px-3 py-2 text-stone-900 dark:text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700 dark:text-stone-300">Batch Etching & Polish Notes (Optional)</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. 0.8mm Acid Etching complete, protective lacquer coating applied."
                  className="w-full bg-amber-50/50 dark:bg-stone-950 border border-amber-300 dark:border-stone-800 rounded-xl px-3 py-2 text-stone-900 dark:text-stone-200 focus:outline-none focus:border-amber-500"
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
          <div className="lg:col-span-2 bg-white/95 dark:bg-stone-900/90 border border-amber-200 dark:border-stone-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="border-b border-amber-200 dark:border-stone-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-stone-900 dark:text-amber-200 font-serif font-bold text-base">
                <ClipboardList className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span>Recent Production Logs</span>
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">Real-time Factory Ledger</span>
            </div>

            <div className="space-y-4">
              {batches.map((batch) => {
                const product = products.find((p) => p.id === batch.menuItemId);
                return (
                  <div
                    key={batch.id}
                    className="bg-amber-50/60 dark:bg-stone-950/90 border border-amber-200 dark:border-stone-800 rounded-2xl p-4 space-y-3 shadow-md dark:shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/80 dark:border-stone-800/80 pb-2">
                      <div>
                        <span className="font-mono font-black text-amber-800 dark:text-amber-400 text-sm">{batch.batchCode}</span>
                        <h4 className="font-bold text-stone-900 dark:text-stone-100 text-xs">
                          {product ? product.name : batch.menuItemId}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-mono font-black px-3 py-1 rounded-xl text-xs">
                          +{batch.quantityProduced} Units Added
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-600 dark:text-stone-400">
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>Supervisor: <strong className="text-stone-900 dark:text-stone-200">{batch.supervisorName}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>Logged At: <strong className="text-stone-900 dark:text-stone-200 font-mono">{new Date(batch.createdAt).toLocaleString()}</strong></span>
                      </div>
                    </div>

                    {batch.notes && (
                      <p className="text-[11px] italic text-stone-600 dark:text-stone-400 bg-white/80 dark:bg-stone-900 p-2 rounded-xl border border-amber-200 dark:border-stone-800">
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
