import { Request, Response, Router } from "express";
import {
	AppError,
	handleError,
	handleSuccess,
} from "@config/helpers/response/response";
import { verifyTokenAdminStore } from "@middlewares/verifyAdminStore.middleware";
import { ProductsDomain } from "../domain/products.domain";
import {
	validatorGetProducts,
	validationCreateProduct,
	validatorGetProductById,
	validatorUpdateProduct,
	validatorChangeStatusProduct,
} from "../validator/products.validator";

export const ProductController = Router();

ProductController.post(
	"/",
	[verifyTokenAdminStore, ...validationCreateProduct],
	async (req: Request, res: Response) => {
		try {
			const productDomain = new ProductsDomain();
			const idStore = req.user.storeId;
			const product = await productDomain.createProduct({
				...req.body,
				storeId: idStore,
			});
			handleSuccess(res, 201, { product });
		} catch (error: any) {
			handleError(res, error.status, error);
		}
	}
);

ProductController.put(
	"/:idProduct",
	[verifyTokenAdminStore, ...validatorUpdateProduct],
	async (req: Request, res: Response) => {
		try {
			const productDomain = new ProductsDomain();
			const { idProduct } = req.params;
			const product = await productDomain.updateProduct(
				Number(idProduct),
				req.body
			);
			handleSuccess(res, 200, { product });
		} catch (error: any) {
			handleError(res, error.status, error);
		}
	}
);

ProductController.get(
	"/:idStore",
	validatorGetProducts,
	async (req: Request, res: Response) => {
		try {
			const productDomain = new ProductsDomain();
			const { idStore } = req.params;
			const { limit, page } = req.query;
			const products = await productDomain.getProductsByStore({
				storeId: Number(idStore),
				limit: Number(limit),
				page: Number(page),
			});
			handleSuccess(res, 200, { products });
		} catch (error: any) {
			handleError(res, error.status, error);
		}
	}
);

ProductController.get(
	"/:idStore/product/:idProduct",
	validatorGetProductById,
	async (req: Request, res: Response) => {
		try {
			const productDomain = new ProductsDomain();
			const { idProduct, idStore } = req.params;
			const products = await productDomain.getProductById(
				Number(idStore),
				Number(idProduct)
			);
			handleSuccess(res, 200, { products });
		} catch (error: any) {
			handleError(res, error.status, error);
		}
	}
);

ProductController.patch(
	"/:idProduct",
	[verifyTokenAdminStore, ...validatorChangeStatusProduct],
	async (req: Request, res: Response) => {
		try {
			const productDomain = new ProductsDomain();
			const { idProduct } = req.params;
			const product = await productDomain.changeStatusProduct(
				Number(idProduct),
				req.body.status
			);
			handleSuccess(res, 200, { product });
		} catch (error: any) {
			handleError(res, error.status, error);
		}
	}
);
