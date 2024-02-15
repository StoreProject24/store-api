import { Request, Response, Router } from "express";
import { handleError, handleSuccess } from "@config/helpers";
import { verifyTokenAdminStore } from "@middlewares/verifyAdminStore.middleware";
import { StoreDomain } from "../domain/store.domain";
import {
	validationChangeImage,
	validationCreateStore,
	validationDeleteStore,
	validationUpdateStore,
} from "../validator/store.validator";
import { verifytoken } from "@middlewares/verifyToken.middleware";

export const StoreController = Router();

StoreController.get(
	"/:idStore",
	verifyTokenAdminStore,
	async (req: Request, res: Response) => {
		try {
			const storeDomain = new StoreDomain();
			const idStore = Number(req.params.idStore);
			const store = await storeDomain.getStoreById(idStore);
			handleSuccess(res, 200, store);
		} catch (error: any) {
			handleError(res, 404, error);
		}
	}
);

StoreController.post(
	"/",
	[verifytoken, ...validationCreateStore],
	async (req: Request, res: Response) => {
		try {
			const storeDomain = new StoreDomain();
			const userId = req.user.id;
			const store = await storeDomain.createStore({ ...req.body, userId });
			handleSuccess(res, 201, store);
		} catch (error: any) {
			handleError(res, 404, error);
		}
	}
);

StoreController.put(
	"/",
	[verifytoken, ...validationUpdateStore],
	async (req: Request, res: Response) => {
		try {
			const storeDomain = new StoreDomain();
			const store = await storeDomain.createStore(req.body);
			handleSuccess(res, 201, store);
		} catch (error: any) {
			handleError(res, 404, error);
		}
	}
);

StoreController.patch(
	"/:id",
	[verifyTokenAdminStore, ...validationDeleteStore],
	async (req: Request, res: Response) => {
		try {
			const storeDomain = new StoreDomain();
			const id = parseInt(req.params.id);
			const store = await storeDomain.deleteStore(id);
			handleSuccess(res, 201, store);
		} catch (error: any) {
			handleError(res, 404, error);
		}
	}
);

StoreController.put(
	"/image",
	[verifyTokenAdminStore, ...validationChangeImage],
	async (req: Request, res: Response) => {
		try {
			const storeDomain = new StoreDomain();
			const image = await storeDomain.updateImageStore(req);
			handleSuccess(res, 201, { image });
		} catch (error: any) {
			handleError(res, 404, error);
		}
	}
);
