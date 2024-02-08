import { Request, Response, Router } from "express";
import { handleError, handleSuccess } from "@config/helpers/handleResponse";

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
BrandsController.get("/", async (req: Request, res: Response) => {
  try {
    return handleSuccess(res, 201, "BrandsController");
  } catch (error) {
    return handleError(res, 201, "BrandsController");
  }
});

BrandsController.post("/", async (req: Request, res: Response) => {
  try {
    return handleSuccess(res, 201, "BrandsController");
  } catch (error) {
    return handleError(res, 201, "BrandsController");
  }
});
