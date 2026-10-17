export type InventoryItem = {

  productName: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stockQuantity: number;
  reorderLevel: number;
  lastUpdated: string;
};

export type InventoryResponse = {
  data: InventoryItem[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
};