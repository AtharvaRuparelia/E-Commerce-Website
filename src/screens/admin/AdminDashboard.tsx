import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Package,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Users,
  Factory,
  Layers,
  Edit,
  Plus,
  Trash2,
  Printer,
  ShieldCheck,
  Search,
  ChevronRight
} from 'lucide-react';
import { MenuItem, Order, OrderStatus, FactoryBatch } from '../../types';
import { listenToMenuItems, addOrUpdateYantraItem, deleteYantraItem } from '../../services/menuService';
import { listenToAllOrders, updateOrderStatus } from '../../services/orderService';
import { listenToFactoryBatches } from '../../services/factoryService';
import { InvoiceModal } from '../../components/InvoiceModal';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'inventory' | 'batches'>('analytics');
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [batches, setBatches] = useState<FactoryBatch[]>([]);

  // Selected Order for Invoice
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // New / Edit Product Modal state
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MenuItem>>({
    name: '',
    category: 'Shree Yantras',
    price: 1499,
    description: '',
    imageUrl: '/items/shree-yantra.jpg',
    isAvailable: true,
    stockCountRemaining: 30,
    minSafetyLimit: 5,
    metalWeightGrams: 250,
    dimensionsInches: '6x6 in'
  });

  useEffect(() => {
    const unsubItems = listenToMenuItems(setProducts);
    const unsubOrders = listenToAllOrders(setOrders);
    const unsubBatches = listenToFactoryBatches(setBatches);

    return () => {
      unsubItems();
      unsubOrders();
      unsubBatches();
    };
  }, []);

  // Compute Analytics Metrics
  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const totalOrdersCount = orders.length;
  const totalStockCount = products.reduce((acc, curr) => acc + (curr.stockCountRemaining || 0), 0);
  const lowStockItems = products.filter(
    (p) => (p.stockCountRemaining || 0) <= (p.minSafetyLimit || 5)
  );

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.name || !editingItem.price) return;

    const newItem: MenuItem = {
      id: editingItem.id || `yantra-${Date.now()}`,
      name: editingItem.name,
      category: editingItem.category || 'Shree Yantras',
      price: Number(editingItem.price),
      description: editingItem.description || '',
      imageUrl: editingItem.imageUrl || '/items/shree-yantra.jpg',
      isAvailable: (editingItem.stockCountRemaining || 0) > 0,
      stockCountRemaining: Number(editingItem.stockCountRemaining || 0),
      minSafetyLimit: Number(editingItem.minSafetyLimit || 5),
      metalWeightGrams: Number(editingItem.metalWeightGrams || 200),
      dimensionsInches: editingItem.dimensionsInches || '6x6 in',
      etchingQuality: editingItem.etchingQuality || 'Precision Etched'
    };

    await addOrUpdateYantraItem(newItem);
    setEditProductModalOpen(false);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this Yantra product from catalog?')) {
      await deleteYantraItem(id);
    }
  };

  const handleToggleStock = async (item: MenuItem) => {
    const isInStock = (item.stockCountRemaining ?? 0) > 0 && item.isAvailable !== false;
    const updatedItem: MenuItem = {
      ...item,
      isAvailable: !isInStock,
      stockCountRemaining: !isInStock ? 25 : 0
    };
    await addOrUpdateYantraItem(updatedItem);
  };

  return (
    <div className="w-full min-h-screen pb-16 pt-6 transition-colors duration-300 bg-amber-50/60 text-stone-900 dark:bg-[#120F0D] dark:text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 dark:border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800 font-mono px-2 py-0.5 rounded font-bold">
                ADMINISTRATION & ANALYTICS
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">Bhavna Pooja Center</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-amber-200 mt-1">
              Central Admin Control Panel
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 bg-white dark:bg-stone-900 p-1.5 rounded-2xl border border-amber-200 dark:border-stone-800 shadow-sm">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-amber-600 text-white dark:text-stone-950 shadow'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Sales Analytics
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-amber-600 text-white dark:text-stone-950 shadow'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Order Dispatch ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'inventory'
                  ? 'bg-amber-600 text-white dark:text-stone-950 shadow'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Yantra Catalog ({products.length})
            </button>
          </div>
        </div>

        {/* TAB 1: SALES ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/95 dark:bg-stone-900/90 border border-amber-200 dark:border-stone-800 rounded-3xl p-6 space-y-2 shadow-xl">
                <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold block">Total Revenue</span>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-mono font-black text-amber-700 dark:text-amber-400">
                    ₹{totalRevenue.toLocaleString()}
                  </span>
                  <div className="p-3 bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700/50 rounded-2xl text-amber-800 dark:text-amber-400">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="bg-white/95 dark:bg-stone-900/90 border border-amber-200 dark:border-stone-800 rounded-3xl p-6 space-y-2 shadow-xl">
                <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold block">Total Orders Processed</span>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                    {totalOrdersCount}
                  </span>
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/50 rounded-2xl text-emerald-800 dark:text-emerald-400">
                    <Package className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="bg-white/95 dark:bg-stone-900/90 border border-amber-200 dark:border-stone-800 rounded-3xl p-6 space-y-2 shadow-xl">
                <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold block">Warehouse Stock Count</span>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-mono font-black text-amber-800 dark:text-amber-300">
                    {totalStockCount} Units
                  </span>
                  <div className="p-3 bg-amber-50 dark:bg-stone-950 border border-amber-200 dark:border-stone-800 rounded-2xl text-amber-700 dark:text-amber-400">
                    <Factory className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="bg-white/95 dark:bg-stone-900/90 border border-amber-200 dark:border-stone-800 rounded-3xl p-6 space-y-2 shadow-xl">
                <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold block">Low-Stock Warnings</span>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-mono font-black text-rose-600 dark:text-rose-400">
                    {lowStockItems.length} Items
                  </span>
                  <div className="p-3 bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 rounded-2xl text-rose-700 dark:text-rose-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Low-Stock Alert Warning Banner */}
            {lowStockItems.length > 0 && (
              <div className="bg-amber-100/80 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-600/60 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 animate-pulse" />
                  <div>
                    <h3 className="font-serif font-bold text-amber-950 dark:text-amber-200 text-sm">
                      Automated Low-Stock Safety Threshold Alert (FR-12)
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      The following products have fallen below minimum safety inventory thresholds. Log a factory batch to restock.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lowStockItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-stone-950/90 p-4 rounded-2xl border border-amber-200 dark:border-stone-800 flex items-center justify-between text-xs shadow-sm"
                    >
                      <div>
                        <span className="font-bold text-stone-900 dark:text-stone-200 block">{item.name}</span>
                        <span className="text-stone-500 dark:text-stone-400 text-[10px]">
                          Min Safety Threshold: {item.minSafetyLimit || 5}
                        </span>
                      </div>
                      <span className="bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-mono font-bold px-2.5 py-1 rounded border border-rose-300 dark:border-rose-800">
                        {item.stockCountRemaining ?? 0} Left
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ORDER DISPATCH CONTROL */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-stone-900 dark:text-amber-200 text-base">Incoming Customer Orders</h3>
            <div className="bg-white/95 dark:bg-stone-900/90 border border-amber-200 dark:border-stone-800 rounded-3xl p-6 overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-amber-50 dark:bg-stone-950 text-stone-600 dark:text-stone-400 border-b border-amber-200 dark:border-stone-800">
                  <tr>
                    <th className="p-3">Order Code</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3 text-center">Items</th>
                    <th className="p-3 text-right">Total Amount</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-200 dark:divide-stone-800 text-stone-900 dark:text-stone-200 font-medium">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-amber-50/50 dark:hover:bg-stone-800/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-amber-800 dark:text-amber-400">{ord.orderNumber}</td>
                      <td className="p-3">
                        <span className="font-semibold block">{ord.userName || ord.studentName}</span>
                        <span className="text-[10px] text-stone-500 dark:text-stone-400">{ord.userEmail}</span>
                      </td>
                      <td className="p-3 text-center font-bold">{ord.items.length}</td>
                      <td className="p-3 text-right font-mono font-bold text-amber-900 dark:text-amber-300">₹{ord.total}</td>
                      <td className="p-3 text-center">
                        <select
                          value={ord.status}
                          onChange={(e: any) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="bg-white dark:bg-stone-950 border border-amber-300 dark:border-stone-800 text-amber-900 dark:text-amber-300 rounded-lg px-2 py-1 text-xs font-bold focus:outline-none"
                        >
                          <option value="Placed">Placed</option>
                          <option value="Packed">Packed</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedInvoiceOrder(ord)}
                          className="px-3 py-1.5 bg-amber-100 dark:bg-stone-800 hover:bg-amber-200 dark:hover:bg-stone-700 text-amber-900 dark:text-amber-300 rounded-lg text-xs font-bold flex items-center gap-1.5 ml-auto border border-amber-300 dark:border-stone-700"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Invoice</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: YANTRA CATALOG & INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-stone-900 dark:text-amber-200 text-base">Product Catalog Listings</h3>
              <button
                onClick={() => {
                  setEditingItem({
                    name: '',
                    category: 'Shree Yantras',
                    price: 1499,
                    description: '',
                    imageUrl: '/items/shree-yantra.jpg',
                    isAvailable: true,
                    stockCountRemaining: 30,
                    minSafetyLimit: 5,
                    metalWeightGrams: 250,
                    dimensionsInches: '6x6 in'
                  });
                  setEditProductModalOpen(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white dark:text-stone-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Yantra Listing</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/95 dark:bg-stone-900/90 border border-amber-200 dark:border-stone-800 rounded-3xl p-5 space-y-4 flex flex-col justify-between shadow-xl"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-amber-200 dark:border-stone-800"
                    />
                    <div>
                      <h4 className="font-bold text-stone-900 dark:text-stone-100 text-xs">{item.name}</h4>
                      <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono block">{item.category}</span>
                      <span className="text-sm font-mono font-bold text-amber-800 dark:text-amber-300">₹{item.price}</span>
                    </div>
                  </div>

                  <div className="bg-amber-50/80 dark:bg-stone-950 p-3 rounded-2xl border border-amber-200 dark:border-stone-800/80 text-[11px] grid grid-cols-2 gap-2 text-stone-700 dark:text-stone-300">
                    <div>
                      <span className="text-stone-500 block">Warehouse Stock:</span>
                      <span className={`font-bold ${(item.stockCountRemaining ?? 0) > 0 && item.isAvailable !== false ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {(item.stockCountRemaining ?? 0) > 0 && item.isAvailable !== false ? `${item.stockCountRemaining} Units` : 'Out of Stock'}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Min Threshold:</span>
                      <span className="font-bold text-amber-800 dark:text-amber-300">{item.minSafetyLimit || 5} Units</span>
                    </div>
                  </div>

                  {/* Stock Availability Toggle Switch */}
                  <div className="flex items-center justify-between bg-amber-50/50 dark:bg-stone-950/80 p-2.5 rounded-2xl border border-amber-200 dark:border-stone-800 text-xs">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">Status Control:</span>
                    <button
                      onClick={() => handleToggleStock(item)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-all shadow ${
                        (item.stockCountRemaining ?? 0) > 0 && item.isAvailable !== false
                          ? 'bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-600/80 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900'
                          : 'bg-rose-100 dark:bg-rose-950/90 border border-rose-300 dark:border-rose-600/80 text-rose-800 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900'
                      }`}
                    >
                      {(item.stockCountRemaining ?? 0) > 0 && item.isAvailable !== false ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>IN STOCK (ON)</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                          <span>OUT OF STOCK (OFF)</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-200 dark:border-stone-800">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setEditProductModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-amber-100 dark:bg-stone-800 hover:bg-amber-200 dark:hover:bg-stone-700 text-amber-900 dark:text-amber-300 text-xs font-bold rounded-xl flex items-center gap-1 border border-amber-300 dark:border-stone-700"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(item.id)}
                      className="px-3 py-1.5 bg-rose-100 dark:bg-rose-950 hover:bg-rose-200 dark:hover:bg-rose-900 text-rose-800 dark:text-rose-300 text-xs font-bold rounded-xl flex items-center gap-1 border border-rose-300 dark:border-rose-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit / New Product Modal */}
      {editProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 border border-amber-300 dark:border-stone-800 text-stone-900 dark:text-stone-100 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-amber-900 dark:text-amber-200 text-lg">
              {editingItem.id ? 'Edit Product Listing' : 'Add New Yantra Listing'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Product Name"
                value={editingItem.name || ''}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                className="w-full bg-amber-50/50 dark:bg-stone-950 border border-amber-300 dark:border-stone-800 rounded-xl p-3 text-stone-900 dark:text-stone-200 focus:outline-none focus:border-amber-500"
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Price (₹)"
                  value={editingItem.price || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                  className="w-full bg-amber-50/50 dark:bg-stone-950 border border-amber-300 dark:border-stone-800 rounded-xl p-3 text-stone-900 dark:text-stone-200 focus:outline-none focus:border-amber-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Stock Quantity"
                  value={editingItem.stockCountRemaining || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, stockCountRemaining: Number(e.target.value) })}
                  className="w-full bg-amber-50/50 dark:bg-stone-950 border border-amber-300 dark:border-stone-800 rounded-xl p-3 text-stone-900 dark:text-stone-200 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Metal Weight (Grams)"
                  value={editingItem.metalWeightGrams || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, metalWeightGrams: Number(e.target.value) })}
                  className="w-full bg-amber-50/50 dark:bg-stone-950 border border-amber-300 dark:border-stone-800 rounded-xl p-3 text-stone-900 dark:text-stone-200 focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  placeholder="Dimensions (e.g. 6x6 in)"
                  value={editingItem.dimensionsInches || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, dimensionsInches: e.target.value })}
                  className="w-full bg-amber-50/50 dark:bg-stone-950 border border-amber-300 dark:border-stone-800 rounded-xl p-3 text-stone-900 dark:text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <textarea
                rows={3}
                placeholder="Description"
                value={editingItem.description || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                className="w-full bg-amber-50/50 dark:bg-stone-950 border border-amber-300 dark:border-stone-800 rounded-xl p-3 text-stone-900 dark:text-stone-200 focus:outline-none focus:border-amber-500"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditProductModalOpen(false)}
                  className="px-4 py-2 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-300 rounded-xl font-bold hover:bg-stone-300 dark:hover:bg-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 text-white dark:text-stone-950 rounded-xl font-bold shadow hover:bg-amber-500"
                >
                  Save Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal Trigger */}
      <InvoiceModal
        isOpen={Boolean(selectedInvoiceOrder)}
        onClose={() => setSelectedInvoiceOrder(null)}
        order={selectedInvoiceOrder}
      />
    </div>
  );
};
