import { Product } from '@shared/types/product.types';

export interface ProductRepository {
  getProductsByPage: (storeId: number, page: number, limit: number) => Promise<{ total: number; products: Product[] }>;
  getProductById: (storeId: number, id: number) => Promise<Product | null>;
}
