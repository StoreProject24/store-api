export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number | null;
  sku: string;
  pricePublic: number;
  tags: string[];
  variants: ProductVariants[];
  storeId: number;
  images?: ProductImages['images'];
  video: string;
  brandId: number | null;
  statusId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariants {
  id: number;
  name: string;
  price: number;
  pricePublic: number;
  sku: string;
  quantity: number;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductsGetSearch {
  storeId: number;
  name: string;
  limit: number;
  page: number;
}

export type ProductCreate = Omit<Product, 'id'>;

export interface ProductsGet {
  page: number;
  limit: number;
  storeId: number;
  q: string;
}

export interface ProductsTotal {
  storeId: number;
  q?: string;
}

export interface ProductsGetByCategoryId {
  page: number;
  limit: number;
  categoryId: number;
  storeId: number;
}

export interface ProductImages {
  images: ImageProduct[];
}

interface ImageProduct {
  productId: number;
  urlImage: string;
}

export type ProductUser = Omit<Product, 'price' | 'createdAt' | 'updatedAt'>;
