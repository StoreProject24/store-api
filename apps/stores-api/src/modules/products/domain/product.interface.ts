// import { Product, ProductUser } from '@shared/types/product.types';
import { ProductUser } from "~types/product";

export interface ProductRepository {
  getProductsByPage: (storeId: number, page: number, limit: number, q: string, categoryIds: number[]) => Promise<{ total: number; products: ProductUser[] }>;
  getProductById: (storeId: number, id: number) => Promise<ProductUser | null>;
  getRandomProducts: (storeId: number, limit: number) => Promise<ProductUser[]>;
  getRelatedProducts: (storeId: number, productId: number, categoryId: number, limit: number) => Promise<ProductUser[]>;
}
