import { Request, Response, Router } from "express";
import { handleError, handleSuccess } from "@config/helpers/response/response";
import { verifyTokenAdminStore } from "@middlewares/verifyAdminStore.middleware";
import { BrandsDomain } from "../domain/brands.domain";

export const BrandsController = Router();

/**
 * 1 Obtener todas las marcas [1. Si es usuario normal traer todas con status 1,
 *  si es adminStore traer todas] dependiendo la tienda a la que pertenezca
 * 2. Crear una marca siendo un adminStore dependiendo la tienda a la que pertenezca
 * 3. Actualizar una marca siendo un adminStore dependiendo la tienda a la que pertenezca
 * 4. Eliminar una marca siendo un adminStore dependiendo la tienda a la que pertenezca
 * 5. actualizar la imagen de la marca siendo un adminStore dependiendo la tienda a la que pertenezca
 */
// 1
BrandsController.get("/:id", async (req: Request, res: Response) => {
	try {
		const brandDomain = new BrandsDomain();
		const id = parseInt(req.params.id);
		const response = await brandDomain.getBrands({ storeId: id, statusIds: [1] });
		return handleSuccess(res, 201, response);
	} catch (error) {
		return handleError(res, 201, "BrandsController");
	}
});

BrandsController.post(
	"/",
	verifyTokenAdminStore,
	async (req: Request, res: Response) => {
		try {
			const brandDomain = new BrandsDomain();
			const response = await brandDomain.createBrand(req.body);
			return handleSuccess(res, 201, response);
		} catch (error) {
			return handleError(res, 201, "BrandsController");
		}
	}
);

BrandsController.patch(
	"/:id",
	verifyTokenAdminStore,
	async (req: Request, res: Response) => {
		try {
			const brandDomain = new BrandsDomain();
			const id = parseInt(req.params.id);
			const response = await brandDomain.updateNameBrand({
				id,
				name: req.body.name,
				storeId: req.user.storeId,
			});
			return handleSuccess(res, 201, response);
		} catch (error) {
			return handleError(res, 201, "BrandsController");
		}
	}
);

BrandsController.delete(
	"/:id",
	verifyTokenAdminStore,
	async (req: Request, res: Response) => {
		try {
			const brandDomain = new BrandsDomain();
			const id = parseInt(req.params.id);
			const response = await brandDomain.deleteBrand(id, req.user.storeId);
			return handleSuccess(res, 201, response);
		} catch (error) {
			return handleError(res, 201, "BrandsController");
		}
	}
);

BrandsController.patch(
	"/image/:id",
	verifyTokenAdminStore,
	async (req: Request, res: Response) => {
		try {
			const brandDomain = new BrandsDomain();
			const id = parseInt(req.params.id);
			// TODO: subir imagen a s3 y obtener la url [CREAR SERVICIO DE SUBIR IMAGEN]
			const response = await brandDomain.updateImageBrand({
				id,
				urlImage: req.body.urlImage,
				storeId: req.user.storeId,
			});
			return handleSuccess(res, 201, response);
		} catch (error) {
			return handleError(res, 201, "BrandsController");
		}
	}
);
