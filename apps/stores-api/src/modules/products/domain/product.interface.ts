import { Product, ProductUser } from '@shared/types/product.types';

export interface ProductRepository {
  getProductsByPage: (storeId: number, page: number, limit: number, q: string, categoryIds: number[]) => Promise<{ total: number; products: Product[] }>;
  getProductById: (storeId: number, id: number) => Promise<Product | null>;
  getRandomProducts: (storeId: number, limit: number) => Promise<ProductUser[]>;
  getRelatedProducts: (storeId: number, productId: number, categoryId: number, limit: number) => Promise<ProductUser[]>;
}
