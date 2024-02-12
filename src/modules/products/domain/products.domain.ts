import {
	create,
	getProductById,
	getProducts,
	getProductsByCategoryId,
} from "../repository/products.repository";
import {
	ProductCreate,
	Product,
	ProductsGet,
	ProductsGetByCategoryId,
} from "../types/products.types";
import { ProductsRepository } from "./products.interface";

export class ProductsDomain implements ProductsRepository {
	async createProduct(product: ProductCreate) {
		return await create(product);
	}

	async getProductsByStore(body: ProductsGet) {
		return await getProducts(body);
	}

	async getProductById(storeId: number, id: number) {
		return await getProductById(storeId, id);
	}

	async getProductsByCategoryId(body: ProductsGetByCategoryId) {
		return await getProductsByCategoryId(body);
	}
}
