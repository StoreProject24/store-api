import { Request, Response, Router } from "express";
import { handleError, handleSuccess } from "@config/helpers/response/response";
import { verifyTokenAdminStore } from "@middlewares/verifyAdminStore.middleware";
import { BrandsDomain } from "../domain/brands.domain";
import {
	validatorCreateBrand,
	validatorGetBrand,
} from "../validator/brans.validator";

export const BrandsController = Router();

BrandsController.get(
	"/:storeId",
	validatorGetBrand,
	async (req: Request, res: Response) => {
		try {
			const brandDomain = new BrandsDomain();
			const storeId = parseInt(req.params.storeId);
			const brands = await brandDomain.getBrands({
				storeId,
				statusIds: [1],
			});
			return handleSuccess(res, 201, { brands });
		} catch (error) {
			return handleError(res, 201, "BrandsController");
		}
	}
);

BrandsController.post(
	"/",
	[verifyTokenAdminStore, ...validatorCreateBrand],
	async (req: Request, res: Response) => {
		try {
			const brandDomain = new BrandsDomain();
			const brands = await brandDomain.createBrand({
				...req.body,
			});
			return handleSuccess(res, 201, { brands });
		} catch (error) {
			return handleError(res, 201, "BrandsController");
		}
	}
);

BrandsController.patch(
	"/:storeId/:id",
	verifyTokenAdminStore,
	async (req: Request, res: Response) => {
		try {
			const brandDomain = new BrandsDomain();
			const id = parseInt(req.params.id);
			const storeId = parseInt(req.params.storeId);
			const brands = await brandDomain.updateNameBrand({
				id,
				storeId,
				name: req.body.name,
			});
			return handleSuccess(res, 201, { brands });
		} catch (error) {
			return handleError(res, 201, "BrandsController");
		}
	}
);

BrandsController.delete(
	"/:storeId/:id",
	verifyTokenAdminStore,
	async (req: Request, res: Response) => {
		try {
			const brandDomain = new BrandsDomain();
			const id = parseInt(req.params.id);
			const storeId = parseInt(req.params.id);
			await brandDomain.deleteBrand(id, storeId);
			return handleSuccess(res, 201, {});
		} catch (error) {
			return handleError(res, 201, "BrandsController");
		}
	}
);

BrandsController.patch(
	"/image/:storeId/:id",
	verifyTokenAdminStore,
	async (req: Request, res: Response) => {
		try {
			const brandDomain = new BrandsDomain();
			const id = parseInt(req.params.id);
			const storeId = parseInt(req.params.storeId);
			const response = await brandDomain.updateImageBrand({
				id,
				urlImage: req.body.urlImage,
				storeId,
			});
			return handleSuccess(res, 201, response);
		} catch (error) {
			return handleError(res, 201, "BrandsController");
		}
	}
);
