import { ObjectId } from 'mongoose';

export interface Sale {
  _id: ObjectId;
  sequential: number;
  items: SaleItem[];
  total: number;
  discount: number;
  storeId: number;
  userId: number | null;
  status: SaleStatus;
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
  status: SaleStatus;
  total: number;
}

export interface SaleItem {
  id: number;
  productId: number;
  productName: string;
  discount: number;
  quantity: number;
  price: number;
  total: number;
}

export interface UpdateSale {
  items?: SaleItem[];
  total?: number;
}

export enum SaleStatus {
  pending = 'pending',
  deleted = 'deleted',
  paid = 'paid',
  cancelled = 'cancelled',
}
