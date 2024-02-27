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
	validatonUploadImagesProduct,
	validatorDeleteImageProduct,
} from "../validator/products.validator";

export const ProductController = Router();

ProductController.post(
	"/",
	[verifyTokenAdminStore, ...validationCreateProduct],
	async (req: Request, res: Response) => {
		try {
			const productDomain = new ProductsDomain();
			const product = await productDomain.createProduct(req.body);
			handleSuccess(res, 201, { product });
		} catch (error: any) {
			handleError(res, error.status, error);
		}
	}
);

ProductController.put(
	"/:storeId/:productId",
	[verifyTokenAdminStore, ...validatorUpdateProduct],
	async (req: Request, res: Response) => {
		try {
			const productDomain = new ProductsDomain();
			const productId = Number(req.params.productId);
			const storeId = Number(req.params.storeId);
			const product = await productDomain.updateProduct(
				productId,
				storeId,
				req.body
			);
			handleSuccess(res, 200, { product });
		} catch (error: any) {
			handleError(res, error.status, error);
		}
	}
);

ProductController.get(
	"/:storeId",
	validatorGetProducts,
	async (req: Request, res: Response) => {
		try {
			const productDomain = new ProductsDomain();
			const storeId = parseInt(req.params.storeId);
			const { limit, page } = req.query;
			const products = await productDomain.getProductsByStore({
				storeId,
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
	"/:storeId/product/:productId",
	validatorGetProductById,
	async (req: Request, res: Response) => {
		try {
			const productDomain = new ProductsDomain();
			const productId = parseInt(req.params.productId);
			const storeId = parseInt(req.params.storeId);
			const products = await productDomain.getProductById(storeId, productId);
			handleSuccess(res, 200, { products });
		} catch (error: any) {
			handleError(res, error.status, error);
		}
	}
);

ProductController.patch(
	"/:productId",
	[verifyTokenAdminStore, ...validatorChangeStatusProduct],
	async (req: Request, res: Response) => {
		try {
			const productDomain = new ProductsDomain();
			const productId = parseInt(req.params.productId);
			const product = await productDomain.changeStatusProduct(
				productId,
				req.body.status
			);
			handleSuccess(res, 200, { product });
		} catch (error: any) {
			handleError(res, error.status, error);
		}
	}
);

ProductController.post(
	"/:productId/images",
	[verifyTokenAdminStore, ...validatonUploadImagesProduct],
	async (req: Request, res: Response) => {
		try {
			const productDomain = new ProductsDomain();
			const productId = parseInt(req.params.productId);
			const userId = req.user.id;
			const images = await productDomain.uploadImages(productId, userId, req);
			handleSuccess(res, 200, { images });
		} catch (error: any) {
			handleError(res, error.status, error);
		}
	}
);

ProductController.delete(
	"/images/:imageId",
	[verifyTokenAdminStore, ...validatorDeleteImageProduct],
	async (req: Request, res: Response) => {
		try {
			const productDomain = new ProductsDomain();
			const imageId = parseInt(req.params.imageId);
			await productDomain.deleteImage(imageId);
			handleSuccess(res, 200, {});
		} catch (error: any) {
			handleError(res, error.status, error);
		}
	}
);
