import { Request, Response, Router } from "express";
import {
	AppError,
	handleError,
	handleSuccess,
} from "@config/helpers/response/response";
import { verifyTokenAdminStore } from "@middlewares/verifyAdminStore.middleware";
import { ProductsDomain } from "../domain/products.domain";
import { validationCreateProduct } from "../validator/products.validator";

export const ProductController = Router();

ProductController.post(
	"/",
	[verifyTokenAdminStore, ...validationCreateProduct],
	async (req: Request, res: Response) => {
		try {
			const productDomain = new ProductsDomain();
			const idStore = req.user.storeId;
			const newProduct = await productDomain.createProduct({
				...req.body,
				storeId: idStore,
			});
			handleSuccess(res, 201, newProduct);
		} catch (error: any) {
			handleError(res, error.status, error);
		}
	}
);

ProductController.get("/:idStore", async (req: Request, res: Response) => {
	try {
		const productDomain = new ProductsDomain();
		const { limit, page, idStore } = req.params;
		const products = await productDomain.getProductsByStore({
			storeId: Number(idStore),
			limit: Number(limit),
			page: Number(page),
		});
		handleSuccess(res, 200, products);
	} catch (error: any) {
		handleError(res, error.status, error);
	}
});
