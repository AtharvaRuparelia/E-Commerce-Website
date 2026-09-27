import { MenuItem } from '../types';

export const INITIAL_YANTRA_ITEMS: MenuItem[] = [
  // --- COPPER YANTRA SECTION ---
  {
    id: 'yantra-1',
    name: 'Shree Yantra',
    section: 'Copper Yantra',
    category: 'Shree Yantra',
    price: 1499,
    description: 'Masterfully etched pure copper Shree Yantra with precise sacred 3D geometric energy alignments for wealth, harmony, and prosperity.',
    imageUrl: '/items/shree-yantra.jpg',
    isAvailable: true,
    rating: 4.9,
    badge: 'BESTSELLER',
    stockCountRemaining: 35,
    minSafetyLimit: 5,
    metalWeightGrams: 250,
    dimensionsInches: '6x6 in',
    etchingQuality: 'Precision Deep Etched (0.8mm Copper)'
  },
  {
    id: 'yantra-2',
    name: 'Kuber Yantra',
    section: 'Copper Yantra',
    category: 'Kuber Yantra',
    price: 1199,
    description: 'Authentic Lord Kuber sacred copper grid matrix. Formulated for shop counters, office desks, and home lockers to attract abundance and financial stability.',
    imageUrl: '/items/kuber-yantra.jpg',
    isAvailable: true,
    rating: 4.8,
    badge: 'HIGH DEMAND',
    stockCountRemaining: 18,
    minSafetyLimit: 5,
    metalWeightGrams: 180,
    dimensionsInches: '5x5 in',
    etchingQuality: 'Traditional Shop Etched'
  },
  {
    id: 'yantra-3',
    name: 'Mahalakshmi Yantra',
    section: 'Copper Yantra',
    category: 'Mahalakshmi Yantra',
    price: 2499,
    description: '8-Form divine Mahalakshmi geometry engraved on heavy 99.9% pure copper sheet. Ideal for Diwali Lakshmi Pooja and temple altars.',
    imageUrl: '/items/mahalakshmi-yantra.jpg',
    isAvailable: true,
    rating: 5.0,
    badge: 'PREMIUM',
    stockCountRemaining: 12,
    minSafetyLimit: 3,
    metalWeightGrams: 450,
    dimensionsInches: '9x9 in',
    etchingQuality: 'Heavy Duty Metal Cut & Etched'
  },
  {
    id: 'yantra-4',
    name: 'Surya Yantra',
    section: 'Copper Yantra',
    category: 'Surya Yantra',
    price: 899,
    description: 'Sun god sacred mathematical diagram etched in pure copper with protective lacquer coating. Promotes leadership, focus, and good health.',
    imageUrl: '/items/surya-yantra.jpg',
    isAvailable: true,
    rating: 4.7,
    badge: 'POPULAR',
    stockCountRemaining: 22,
    minSafetyLimit: 5,
    metalWeightGrams: 150,
    dimensionsInches: '4x4 in',
    etchingQuality: 'Laser Precision Etched'
  },
  {
    id: 'yantra-5',
    name: 'Vastu Dosh Nivaran Yantra',
    section: 'Copper Yantra',
    category: 'Vastu Yantra',
    price: 2999,
    description: 'Comprehensive 13-in-1 Vastu correction copper framework designed to neutralize architectural directional flaws in homes and commercial properties.',
    imageUrl: '/items/vastu-dosh-nivaran-yantra.jpg',
    isAvailable: true,
    rating: 4.9,
    badge: 'RECOMMENDED',
    stockCountRemaining: 8,
    minSafetyLimit: 4,
    metalWeightGrams: 600,
    dimensionsInches: '12x12 in',
    etchingQuality: 'Master Artisan Hand Finish'
  },
  {
    id: 'yantra-6',
    name: 'Mahamrityunjaya Yantra',
    section: 'Copper Yantra',
    category: 'Mahamrityunjaya Yantra',
    price: 1299,
    description: 'Sacred Lord Shiva Yantra for protection against illness, negative energies, and untimely mishaps. Deep etched 0.8mm copper sheet.',
    imageUrl: '/items/mahamrityunjaya-yantra.jpg',
    isAvailable: true,
    rating: 4.9,
    badge: 'SHIELD OF PROTECTION',
    stockCountRemaining: 15,
    minSafetyLimit: 5,
    metalWeightGrams: 200,
    dimensionsInches: '6x6 in',
    etchingQuality: '0.8mm Deep Acid Etched'
  },
  {
    id: 'yantra-7',
    name: 'Saraswati Yantra',
    section: 'Copper Yantra',
    category: 'Saraswati Yantra',
    price: 1199,
    description: 'Dedicated to Goddess Saraswati. Enhances concentration, academic success, and artistic clarity.',
    imageUrl: '/items/saraswati-yantra.jpg',
    isAvailable: true,
    rating: 4.8,
    badge: 'FOR STUDENTS',
    stockCountRemaining: 25,
    minSafetyLimit: 5,
    metalWeightGrams: 180,
    dimensionsInches: '6x6 in',
    etchingQuality: '0.8mm Acid Etched'
  },

  // --- POOJA PRODUCTS SECTION ---
  // Sub-category: Aggarbatti
  {
    id: 'pooja-1',
    name: 'Chandan Agarbatti',
    section: 'Pooja Products',
    category: 'Aggarbatti',
    price: 249,
    description: '100% natural Mysore Sandalwood aromatic incense sticks. Hand-rolled with natural essential oils for divine tranquility during daily prayers.',
    imageUrl: '/items/chandan-agarbatti.jpg',
    isAvailable: true,
    rating: 4.9,
    badge: 'AROMATIC',
    stockCountRemaining: 50,
    minSafetyLimit: 10,
    metalWeightGrams: 250
  },
  {
    id: 'pooja-2',
    name: 'Mogra Agarbatti',
    section: 'Pooja Products',
    category: 'Aggarbatti',
    price: 199,
    description: 'Refreshing floral incense sticks crafted from natural white Mogra & Kewra flower extracts. Charcoal-free formula providing long-lasting fragrance.',
    imageUrl: '/items/mogra-agarbatti.jpg',
    isAvailable: true,
    rating: 4.8,
    stockCountRemaining: 40,
    minSafetyLimit: 10,
    metalWeightGrams: 200
  },

  // Sub-category: Dhoop Batti
  {
    id: 'pooja-3',
    name: 'Rose Dhoop Batti',
    section: 'Pooja Products',
    category: 'Dhoop Batti',
    price: 299,
    description: 'Balaji Premium Rose wet dhoop batti crafted with natural Indian rose extracts for soothing aromatic prayer rituals.',
    imageUrl: '/items/rose-dhoop-batti.jpg',
    isAvailable: true,
    rating: 4.9,
    badge: 'PREMIUM ROSE',
    stockCountRemaining: 30,
    minSafetyLimit: 8,
    metalWeightGrams: 220
  },
  {
    id: 'pooja-4',
    name: 'Kewda Dhoop Batti',
    section: 'Pooja Products',
    category: 'Dhoop Batti',
    price: 249,
    description: 'Balaji Premium Thick Kewda bamboo-less dhoop sticks infused with natural screwpine flower fragrance for long-lasting aroma.',
    imageUrl: '/items/kewda-dhoop-batti.jpg',
    isAvailable: true,
    rating: 4.8,
    badge: 'KEWDA FLAVOR',
    stockCountRemaining: 25,
    minSafetyLimit: 5,
    metalWeightGrams: 180
  },

  // Sub-category: Dhoop
  {
    id: 'pooja-5',
    name: 'Guggle Dhoop',
    section: 'Pooja Products',
    category: 'Dhoop',
    price: 180,
    description: 'Pure authentic Guggle resin for traditional temple-style aromatic purification smoke.',
    imageUrl: '/items/guggle-dhoop.jpg',
    isAvailable: true,
    rating: 4.9,
    badge: 'PURE GUGGLE',
    stockCountRemaining: 60,
    minSafetyLimit: 12,
    metalWeightGrams: 150
  },

  // Sub-category: Mala
  {
    id: 'pooja-6',
    name: 'Rudraksha Mala',
    section: 'Pooja Products',
    category: 'Mala',
    price: 899,
    description: 'Authentic 5-faced Nepal Rudraksha rosary mala certified for mantra chanting, meditation, and daily wearing.',
    imageUrl: '/items/rudraksha-mala.jpg',
    isAvailable: true,
    rating: 5.0,
    badge: 'CERTIFIED',
    stockCountRemaining: 20,
    minSafetyLimit: 5,
    metalWeightGrams: 110
  },
  {
    id: 'pooja-7',
    name: 'Tulsi Mala',
    section: 'Pooja Products',
    category: 'Mala',
    price: 499,
    description: 'Handcrafted sacred Tulsi wood mala beads blessed for Vishnu & Krishna bhakti prayers.',
    imageUrl: '/items/tulsi-mala.jpg',
    isAvailable: true,
    rating: 4.9,
    stockCountRemaining: 30,
    minSafetyLimit: 8,
    metalWeightGrams: 80
  },

  // Sub-category: Copper Products
  {
    id: 'pooja-8',
    name: 'Copper Pooja Thali Set',
    section: 'Pooja Products',
    category: 'Copper Products',
    price: 1899,
    description: '7-Piece complete ritual set including heavy copper thali, diya, agarbatti stand, bell, water kalash, spoon, and kumkum katori.',
    imageUrl: '/items/copper-thali-set.jpg',
    isAvailable: true,
    rating: 4.9,
    badge: '7 PIECE SET',
    stockCountRemaining: 15,
    minSafetyLimit: 5,
    metalWeightGrams: 850,
    dimensionsInches: '11 in Dia'
  },
  {
    id: 'pooja-9',
    name: 'Copper Kalash',
    section: 'Pooja Products',
    category: 'Copper Products',
    price: 799,
    description: 'Traditional heavy gauge seamless copper kalash with sacred Swastik & Om engravings for Abhishek rituals.',
    imageUrl: '/items/copper-kalash.jpg',
    isAvailable: true,
    rating: 4.8,
    stockCountRemaining: 40,
    minSafetyLimit: 8,
    metalWeightGrams: 320,
    dimensionsInches: '6 in Height'
  },

  // Sub-category: Others
  {
    id: 'pooja-10',
    name: 'Bhimseni Kapoor',
    section: 'Pooja Products',
    category: 'Others',
    price: 350,
    description: 'Edible grade pure Bhimseni camphor flakes for Aarti, Havan, and medicinal air purification.',
    imageUrl: '/items/bhimseni-kapoor.jpg',
    isAvailable: true,
    rating: 4.9,
    stockCountRemaining: 45,
    minSafetyLimit: 10,
    metalWeightGrams: 200
  },
  {
    id: 'pooja-11',
    name: 'Kumkum',
    section: 'Pooja Products',
    category: 'Others',
    price: 150,
    description: 'Pure natural red vermilion kumkum powder for sacred tilak and ritual worship.',
    imageUrl: '/items/kumkum.jpg',
    isAvailable: true,
    rating: 4.8,
    stockCountRemaining: 50,
    minSafetyLimit: 10,
    metalWeightGrams: 100
  }
];

const LOCAL_STORAGE_KEY = 'bhavna_pooja_catalog_v19';

export function getLocalItems(): MenuItem[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('LocalStorage catalog error:', e);
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_YANTRA_ITEMS));
  return INITIAL_YANTRA_ITEMS;
}

export function saveLocalItems(items: MenuItem[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('trustforge_menu_updated'));
  } catch (e) {
    console.error('Save local items error:', e);
  }
}

export async function seedInitialMenuIfEmpty(): Promise<void> {
  const current = getLocalItems();
  if (!current || current.length === 0) {
    saveLocalItems(INITIAL_YANTRA_ITEMS);
  }
}

export function listenToMenuItems(callback: (items: MenuItem[]) => void): () => void {
  callback(getLocalItems());

  const handleUpdate = () => {
    callback(getLocalItems());
  };

  window.addEventListener('trustforge_menu_updated', handleUpdate);
  window.addEventListener('storage', handleUpdate);

  return () => {
    window.removeEventListener('trustforge_menu_updated', handleUpdate);
    window.removeEventListener('storage', handleUpdate);
  };
}

export async function updateMenuItemStock(productId: string, newStock: number): Promise<void> {
  const items = getLocalItems();
  const updated = items.map((item) =>
    item.id === productId ? { ...item, stockCountRemaining: newStock, isAvailable: newStock > 0 } : item
  );
  saveLocalItems(updated);
}

export async function addOrUpdateYantraItem(item: MenuItem): Promise<void> {
  const items = getLocalItems();
  const index = items.findIndex((i) => i.id === item.id);
  let updated: MenuItem[];
  if (index >= 0) {
    updated = [...items];
    updated[index] = item;
  } else {
    updated = [item, ...items];
  }
  saveLocalItems(updated);
}

export async function deleteYantraItem(productId: string): Promise<void> {
  const items = getLocalItems();
  const updated = items.filter((i) => i.id !== productId);
  saveLocalItems(updated);
}
