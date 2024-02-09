import { NextFunction, Request, Response } from "express";
import { handleError } from "@config/helpers";
import { verifytoken } from "./verifyToken.middleware";

export const verifyTokenAdmin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	verifytoken(req, res, next);
	if (req.user.rol !== "ADMIN") {
		handleError(res, 403, "You are not an admin");
	}
};
