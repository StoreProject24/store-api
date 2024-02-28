import { Request } from "express";
import { deleteImages, uploadImages } from "@services/image/image.service";
import { AppError } from "@config/helpers";
import { existStoreRedis } from "@modules/stores/utils/storeRedis";
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
	ProductsGet,
	ProductsGetByCategoryId,
	ProductImages,
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

	async updateProduct(id: number, storeId: number, product: ProductCreate) {
		return await update(id, storeId, product);
	}

	async changeStatusProduct(id: number, status: number) {
		return await updateStatusProduct(id, status);
	}

	async uploadImages(
		productId: number,
		storeId: number,
		userId: number,
		req: Request
	) {
		const store = await existStoreRedis(userId, storeId);
		if (!store) {
			throw new AppError(409, "Store not found");
		}
		const existProduct = await getProductByIdProduct(productId);
		if (!existProduct) {
			throw new AppError(404, "Product not found");
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
			throw new AppError(404, "Image not found");
		}
		await deleteImageProduct(imageId);
		await deleteImages([image.urlImage]);
	}
}
