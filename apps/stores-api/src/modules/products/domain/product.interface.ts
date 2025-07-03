import { Product } from '@shared/types/product.types';

export interface ProductRepository {
  getProductsByPage: (storeId: number, page: number, limit: number, search: string, categoryIds:string | null) => Promise<{ total: number; products: Product[] }>;
  getProductById: (storeId: number, id: number) => Promise<Product | null>;
  getRandomProduct: (storeId: number, limit: number) => Promise<Product[]>;
  getRelatedProduct: (storeId: number, productId: number, categoryId: number, limit: number) => Promise<Product[]>;
}
