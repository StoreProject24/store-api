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
  variantTypes: VariantType[];
  variantCombinations: VariantCombination[];
  storeId: number;
  images?: ProductImages[];
  video: string;
  brandId: number | null;
  statusId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VariantType {
  id: number;
  name: string;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
  options: VariantOption[];
}
export interface VariantOption {
  id: number;
  name: string; 
  variantTypeId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface VariantCombination {
  id: number;
  label: string;
  sku: string;
  price: number;
  pricePublic: number;
  quantity: number;
  status: boolean;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
  values: string[];
}

export interface VariantCombinationValue {
  id: number;
  combinationId: number;
  optionId: number;
  option: VariantOption;
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
  id?: number;
  productId: number;
  urlImage: string;
}

export type ProductUser = Omit<Product, 'price' | 'createdAt' | 'updatedAt'>;
