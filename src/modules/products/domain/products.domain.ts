import { Request } from "express";
import {
	create,
	createProductImages,
	deleteImageProduct,
	getImageProductId,
	getProductById,
	getProductByIdProduct,
	getProducts,
	getProductsByCategoryId,
	update,
	updateStatusProduct,
} from "../repository/products.repository";
import {
	ProductCreate,
	Product,
	ProductsGet,
	ProductsGetByCategoryId,
	ProductImages,
} from "../types/products.types";
import { ProductsRepository } from "./products.interface";
import { deleteImages, uploadImages } from "@services/image/image.service";
import { getKeyRedis } from "@config/redis/redis";
import { Store } from "@modules/stores/types/store.types";

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

	async updateProduct(id: number, storeId: number, product: ProductCreate) {
		return await update(id, storeId, product);
	}

	async changeStatusProduct(id: number, status: number) {
		return await updateStatusProduct(id, status);
	}

	async uploadImages(productId: number, userId: number, req: Request) {
		const existStore: string | null = await getKeyRedis(`user-${userId}`);
		const store: Store | null =
			existStore !== null ? JSON.parse(existStore) : null;
		if (store === null) {
			throw new Error("Store not found");
		}
		const existProduct = await getProductByIdProduct(productId);
		if (existProduct === null) {
			throw new Error("Product not found");
		}
		const images = await uploadImages(req, store.id, "products");
		const imagesProduct: ProductImages["images"] = [];
		for (const img of images) {
			imagesProduct.push({
				urlImage: img,
				productId: productId,
			});
		}
		await createProductImages(imagesProduct);
		return images;
	}

	async deleteImage(imageId: number) {
		const image = await getImageProductId(imageId);
		if (!image) {
			throw new Error("Image not found");
		}
		await deleteImageProduct(imageId);
		await deleteImages([image.urlImage]);
	}
}
