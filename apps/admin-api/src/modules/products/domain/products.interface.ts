import { Product, ProductCreate } from "../types/products.types";

export interface ProductsRepository {
	createProduct(product: ProductCreate): Promise<Product>;
}
