import { ObjectId } from 'mongoose';

export interface Sale {
  _id: ObjectId;
  sequential: number;
  items: SaleItem[];
  total: number;
  discount: number;
  storeId: number;
  userId: number | null;
  statusId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSale {
  sequential: number;
  items: SaleItem[];
  total: number;
  storeId: number;
  userId: number | null;
}

export interface CreateSaleBody {
  userId: number;
  items: SaleItem[];
  storeId: number;
  discount: number;
  statusId: number;
  total: number;
}

export interface SaleItem {
  categoryId: number | null;
  combinationId: number | null;
  productId: number;
  image: string;
  key: string;
  name: string;
  pricePublic: number;
  quantity: number;
  stock: number;
  variantName: string| null;

}

export interface UpdateSale {
  items?: SaleItem[];
  total?: number;
}