import { FactoryBatch } from '../types';
import { getLocalItems, updateMenuItemStock } from './menuService';

const FACTORY_BATCHES_KEY = 'trustforge_factory_batches_v1';

const INITIAL_BATCHES: FactoryBatch[] = [
  {
    id: 'batch-001',
    batchCode: 'BAT-2026-089',
    productId: 'yantra-1',
    productName: 'Shree Yantra',
    quantityProduced: 25,
    supervisorId: 'sup-c002',
    supervisorName: 'Atharva Ruparelia (Shop Lead)',
    productionDate: Date.now() - 3600000 * 48,
    notes: '0.8mm Deep Etching batch verified for geometric accuracy.'
  },
  {
    id: 'batch-002',
    batchCode: 'BAT-2026-090',
    productId: 'yantra-2',
    productName: 'Kuber Yantra',
    quantityProduced: 20,
    supervisorId: 'sup-c002',
    supervisorName: 'Atharva Ruparelia (Shop Lead)',
    productionDate: Date.now() - 3600000 * 24,
    notes: 'Standard 5x5 inch copper plate cutting batch completed.'
  }
];

export function getLocalFactoryBatches(): FactoryBatch[] {
  try {
    const data = localStorage.getItem(FACTORY_BATCHES_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('LocalStorage factory batch error:', e);
  }
  localStorage.setItem(FACTORY_BATCHES_KEY, JSON.stringify(INITIAL_BATCHES));
  return INITIAL_BATCHES;
}

export function saveLocalFactoryBatches(batches: FactoryBatch[]): void {
  try {
    localStorage.setItem(FACTORY_BATCHES_KEY, JSON.stringify(batches));
    window.dispatchEvent(new Event('trustforge_batches_updated'));
  } catch (e) {
    console.error('Save local factory batches error:', e);
  }
}

export async function logFactoryBatchEntry(
  productId: string,
  quantityProduced: number,
  supervisorName: string,
  notes?: string
): Promise<FactoryBatch> {
  const items = getLocalItems();
  const product = items.find((i) => i.id === productId);
  if (!product) {
    throw new Error('Selected product does not exist in catalog');
  }

  const batchCode = `BAT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const batchId = `batch-${Date.now()}`;

  const newBatch: FactoryBatch = {
    id: batchId,
    batchCode,
    productId,
    productName: product.name,
    quantityProduced: Number(quantityProduced),
    supervisorId: 'sup-c002',
    supervisorName: supervisorName || 'Atharva Ruparelia (Supervisor)',
    productionDate: Date.now(),
    notes: notes || 'Completed factory batch production'
  };

  // Increment warehouse stock
  const currentStock = product.stockCountRemaining ?? 0;
  await updateMenuItemStock(productId, currentStock + Number(quantityProduced));

  const batches = getLocalFactoryBatches();
  saveLocalFactoryBatches([newBatch, ...batches]);

  return newBatch;
}

export function listenToFactoryBatches(callback: (batches: FactoryBatch[]) => void): () => void {
  callback(getLocalFactoryBatches());

  const handleUpdate = () => callback(getLocalFactoryBatches());
  window.addEventListener('trustforge_batches_updated', handleUpdate);
  window.addEventListener('storage', handleUpdate);

  return () => {
    window.removeEventListener('trustforge_batches_updated', handleUpdate);
    window.removeEventListener('storage', handleUpdate);
  };
}
