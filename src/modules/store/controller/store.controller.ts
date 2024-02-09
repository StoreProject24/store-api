import { Request, Response, Router } from "express";
import { handleError, handleSuccess } from "@config/helpers";
import { verifyTokenAdmin } from "@middlewares/verifyAdmin.middleware";
import { StoreDomain } from "../domain/store.domain";
import { validatioCreateStore } from "../validator/store.validator";

export const StoreController = Router();

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
	verifyTokenAdmin,
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

// StoreController.put(
// 	"/",
// 	verifyTokenAdmin,
// 	async (req: Request, res: Response) => {
// 		try {
// 			const storeDomain = new StoreDomain();
// 			const store = await storeDomain.createStore(req.body);
// 			handleSuccess(res, 201, store);
// 		} catch (error: any) {
// 			handleError(res, 404, error);
// 		}
// 	}
// );