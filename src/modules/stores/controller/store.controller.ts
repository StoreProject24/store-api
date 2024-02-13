import { Request, Response, Router } from "express";
import { handleError, handleSuccess } from "@config/helpers";
import { verifyTokenAdminStore } from "@middlewares/verifyAdminStore.middleware";
import { StoreDomain } from "../domain/store.domain";
import {
	validatioCreateStore,
	validatioDeleteStore,
	validatioUpdateStore,
} from "../validator/store.validator";
import { verifyTokenAdmin } from "@middlewares/verifyAdmin.middleware";

export const StoreController = Router();

StoreController.get("/:idStore", async (req: Request, res: Response) => {
	try {
		const storeDomain = new StoreDomain();
		const idStore = Number(req.params.idStore);
		const store = await storeDomain.getStoreById(idStore);
		handleSuccess(res, 200, store);
	} catch (error: any) {
		handleError(res, 404, error);
	}
});

StoreController.post(
	"/",
	[verifyTokenAdmin, ...validatioCreateStore],
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

StoreController.put(
	"/",
	[verifyTokenAdminStore, ...validatioUpdateStore],
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
	[verifyTokenAdminStore, ...validatioDeleteStore],
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
