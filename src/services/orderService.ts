import { Order, OrderStatus, CartItem } from '../types';
import { getLocalItems, updateMenuItemStock } from './menuService';

const ORDERS_LOCAL_KEY = 'trustforge_orders_v2';

// Seed sample orders if empty
const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'TF-8942',
    userId: 'usr-1',
    userName: 'Atharva Ruparelia',
    userEmail: 'atharva@upgcm.ac.in',
    studentId: 'usr-1',
    studentName: 'Atharva Ruparelia',
    studentEmail: 'atharva@upgcm.ac.in',
    items: [
      {
        menuItem: {
          id: 'yantra-1',
          name: 'Shree Yantra',
          category: 'Shree Yantra',
          price: 1499,
          description: 'Masterfully etched pure copper Shree Yantra',
          imageUrl: '/items/shree-yantra.jpg',
          isAvailable: true,
          metalWeightGrams: 250,
          dimensionsInches: '6x6 in'
        },
        quantity: 1
      }
    ],
    subtotal: 1499,
    tax: 270,
    total: 1769,
    status: 'Dispatched',
    pickupOtp: '8942',
    shippingAddress: '402 Vile Parle West, Juhu Scheme, Mumbai 400056',
    specialInstructions: 'Handle with care. Consecrated Copper Item.',
    createdAt: Date.now() - 3600000 * 24,
    updatedAt: Date.now() - 3600000 * 12,
    paymentMethod: 'Online Payment (UPI/Card)',
    paymentStatus: 'Paid',
    razorpayPaymentId: 'pay_TF_99238491'
  }
];

export function getLocalOrders(): Order[] {
  try {
    const data = localStorage.getItem(ORDERS_LOCAL_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('LocalStorage order error:', e);
  }
  localStorage.setItem(ORDERS_LOCAL_KEY, JSON.stringify(SAMPLE_ORDERS));
  return SAMPLE_ORDERS;
}

export function saveLocalOrders(orders: Order[]): void {
  try {
    localStorage.setItem(ORDERS_LOCAL_KEY, JSON.stringify(orders));
    window.dispatchEvent(new Event('trustforge_orders_updated'));
  } catch (e) {
    console.error('Save local orders error:', e);
  }
}

export const createOrder = async (
  userId: string,
  userName: string,
  userEmail: string,
  items: CartItem[],
  subtotal: number,
  tax: number,
  total: number,
  shippingAddress?: string,
  specialInstructions?: string,
  paymentDetails?: {
    paymentMethod?: string;
    paymentStatus?: string;
    razorpayPaymentId?: string;
  }
): Promise<Order> => {
  const randomToken = Math.floor(1000 + Math.random() * 9000);
  const orderNumber = `TF-${randomToken}`;
  const orderId = `ord-${Date.now()}`;

  const orderData: Order = {
    id: orderId,
    orderNumber,
    userId: userId || 'guest-user',
    userName: userName || 'Valued Customer',
    userEmail: userEmail || 'customer@example.com',
    studentId: userId || 'guest-user',
    studentName: userName || 'Valued Customer',
    studentEmail: userEmail || 'customer@example.com',
    items,
    subtotal,
    tax,
    total,
    status: 'Placed',
    pickupOtp: String(randomToken),
    shippingAddress: shippingAddress || 'Default Address',
    specialInstructions: specialInstructions?.trim() || '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    paymentMethod: paymentDetails?.paymentMethod || 'Simulated Payment Gateway',
    paymentStatus: paymentDetails?.paymentStatus || 'Paid',
    razorpayPaymentId: paymentDetails?.razorpayPaymentId || `pay_${randomToken}`
  };

  // Decrement warehouse inventory for purchased items
  const menuItems = getLocalItems();
  items.forEach((item) => {
    const existing = menuItems.find((m) => m.id === item.menuItem.id);
    if (existing && existing.stockCountRemaining !== undefined) {
      const newStock = Math.max(0, existing.stockCountRemaining - item.quantity);
      updateMenuItemStock(existing.id, newStock);
    }
  });

  const orders = getLocalOrders();
  saveLocalOrders([orderData, ...orders]);
  return orderData;
};

export const listenToStudentOrders = (
  userId: string,
  callback: (orders: Order[]) => void
): (() => void) => {
  const filterAndEmit = () => {
    const orders = getLocalOrders();
    const userOrders = orders.filter(
      (o) => !userId || o.userId === userId || o.studentId === userId || userId === 'guest-user'
    );
    callback(userOrders);
  };

  filterAndEmit();

  const handleUpdate = () => filterAndEmit();
  window.addEventListener('trustforge_orders_updated', handleUpdate);
  window.addEventListener('storage', handleUpdate);

  return () => {
    window.removeEventListener('trustforge_orders_updated', handleUpdate);
    window.removeEventListener('storage', handleUpdate);
  };
};

export const listenToAllOrders = (callback: (orders: Order[]) => void): (() => void) => {
  callback(getLocalOrders());

  const handleUpdate = () => callback(getLocalOrders());
  window.addEventListener('trustforge_orders_updated', handleUpdate);
  window.addEventListener('storage', handleUpdate);

  return () => {
    window.removeEventListener('trustforge_orders_updated', handleUpdate);
    window.removeEventListener('storage', handleUpdate);
  };
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus
): Promise<void> => {
  const orders = getLocalOrders();
  const updated = orders.map((o) =>
    o.id === orderId ? { ...o, status, updatedAt: Date.now() } : o
  );
  saveLocalOrders(updated);
};

export const fetchOrderById = async (orderId: string): Promise<Order | null> => {
  const orders = getLocalOrders();
  return orders.find((o) => o.id === orderId) || null;
};
