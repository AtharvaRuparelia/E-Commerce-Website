export type UserRole = 'customer' | 'student' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  rollNumber?: string;
  phone?: string;
  address?: string;
  createdAt: number;
}

export type MainProductSection = 'All' | 'Copper Yantra' | 'Pooja Products';

export type PoojaSubCategory =
  | 'All'
  | 'Aggarbatti'
  | 'Dhoop Batti'
  | 'Dhoop'
  | 'Mala'
  | 'Copper Products'
  | 'Others';

export interface MenuItem {
  id: string;
  name: string;
  section: MainProductSection;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  isAvailable: boolean;
  isVeg?: boolean;
  rating?: number;
  preparationTimeMinutes?: number;
  stockCountRemaining?: number;
  badge?: string;
  createdAt?: number;
  // Specifications
  metalWeightGrams?: number;
  dimensionsInches?: string;
  etchingQuality?: string;
  minSafetyLimit?: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export type OrderStatus = 'Placed' | 'Packed' | 'Dispatched' | 'Delivered' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  studentId?: string;
  studentName?: string;
  studentEmail?: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  pickupOtp?: string;
  shippingAddress?: string;
  specialInstructions?: string;
  createdAt: number;
  updatedAt?: number;
  paymentMethod?: string;
  paymentStatus?: 'Paid' | 'Pending' | 'Failed' | string;
  razorpayPaymentId?: string;
}

export interface FactoryBatch {
  id: string;
  batchCode: string;
  productId: string;
  productName: string;
  quantityProduced: number;
  supervisorId: string;
  supervisorName: string;
  productionDate: number;
  notes?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  imageUrl: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  dimensions: string;
}
