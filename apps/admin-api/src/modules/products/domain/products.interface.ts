import { Product, ProductCreate } from '@shared/types/product.types';

export interface ProductsRepository {
  createProduct(product: ProductCreate): Promise<Product>;
}
