export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number | null;
  sku: string;
  pricePublic: number;
  tags: string[] | string;
  video: string | null;
  brandId: number | null;
  statusId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductsGetSearch {
  storeId: number;
  name: string;
  limit: number;
  page: number;
}

export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
  sku: string;
  tags: string[];
  video: string;
  pricePublic: number;
  brandId?: number;
  statusId?: number;
  storeId: number;
}

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
