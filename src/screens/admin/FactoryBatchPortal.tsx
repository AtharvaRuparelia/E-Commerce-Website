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
    <div className="w-full bg-[#120F0D] text-stone-100 min-h-screen pb-16 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border border-amber-600/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full">
              <Factory className="w-3.5 h-3.5" />
              <span>Shop Production & Live Inventory Synchronization</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-amber-200">
              Factory Batch Production Portal
            </h1>
            <p className="text-xs text-stone-400 max-w-xl">
              Dedicated portal for manufacturing personnel to enter finished copper Yantra production batches, instantly updating central warehouse inventory in real time.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-stone-950/80 p-4 rounded-2xl border border-stone-800">
            <div className="text-center px-3 border-r border-stone-800">
              <span className="block text-2xl font-black text-amber-400">{batches.length}</span>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider">Logged Batches</span>
            </div>
            <div className="text-center px-3">
              <span className="block text-2xl font-black text-emerald-400">
                {products.reduce((acc, curr) => acc + (curr.stockCountRemaining || 0), 0)}
              </span>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider">Total Stock</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Log Batch Entry Form */}
          <div className="lg:col-span-1 bg-stone-900/90 border border-stone-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="border-b border-stone-800 pb-3 flex items-center gap-2 text-amber-300 font-serif font-bold text-base">
              <PlusCircle className="w-5 h-5 text-amber-500" />
              <span>Log New Manufacturing Batch</span>
            </div>

            {successMessage && (
              <div className="bg-emerald-950/80 border border-emerald-700 text-emerald-200 p-4 rounded-2xl text-xs flex items-start gap-2 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="bg-rose-950/80 border border-rose-800 text-rose-200 p-4 rounded-2xl text-xs flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Product Selection */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-300">Select Copper Yantra Item</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500 font-medium"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Current Stock: {p.stockCountRemaining ?? 0})
                    </option>
                  ))}
                </select>
              </div>

              {selectedProduct && (
                <div className="bg-stone-950/80 p-3 rounded-2xl border border-stone-800/80 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-400">Metal Specifications:</span>
                    <span className="font-semibold text-amber-300">
                      {selectedProduct.metalWeightGrams ? `${selectedProduct.metalWeightGrams}g` : ''}{' '}
                      {selectedProduct.dimensionsInches || ''}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-400">Current Warehouse Stock:</span>
                    <span className="font-bold text-emerald-400">
                      {selectedProduct.stockCountRemaining ?? 0} Units
                    </span>
                  </div>
                </div>
              )}

              {/* Quantity Produced */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-300">Finished Batch Quantity (Units)</label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-200 font-mono font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Supervisor Name / ID */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-300">Supervisor / Artisan Lead</label>
                <input
                  type="text"
                  value={supervisorName}
                  onChange={(e) => setSupervisorName(e.target.value)}
                  placeholder="Supervisor Name or SAP ID"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Production Notes */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-300">Shop Notes / Quality Verification</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="E.g., 0.8mm gauge deep etched, lacquered, geometrically verified..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Factory className="w-4 h-4" />
                <span>{submitting ? 'Logging Batch...' : 'Submit & Increment Warehouse Stock'}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Factory Production Logs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-amber-200 text-base flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-amber-500" />
                <span>Shop Production Batch Audit Log</span>
              </h3>
              <span className="text-xs text-stone-400 font-mono">
                {batches.length} Recorded Submissions
              </span>
            </div>

            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-4 sm:p-6 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950 text-stone-400 border-b border-stone-800">
                    <tr>
                      <th className="p-3">Batch Code</th>
                      <th className="p-3">Yantra Product</th>
                      <th className="p-3 text-center">Qty Added</th>
                      <th className="p-3">Supervisor</th>
                      <th className="p-3 text-right">Production Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-200 font-medium">
                    {batches.map((batch) => (
                      <tr key={batch.id} className="hover:bg-stone-800/40 transition-colors">
                        <td className="p-3 font-mono font-bold text-amber-400">{batch.batchCode}</td>
                        <td className="p-3 font-semibold text-stone-100">{batch.productName}</td>
                        <td className="p-3 text-center">
                          <span className="bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-800">
                            +{batch.quantityProduced}
                          </span>
                        </td>
                        <td className="p-3 text-stone-300">{batch.supervisorName}</td>
                        <td className="p-3 text-right text-stone-400 font-mono text-[11px]">
                          {new Date(batch.productionDate).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
