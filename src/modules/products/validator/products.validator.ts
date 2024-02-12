import { handleValidator } from "@config/helpers";
import { check, param } from "express-validator";

export const validationCreateProduct = [
	check("name").isString().withMessage("name is required"),
	check("description").isString().withMessage("description is required"),
	check("price").isNumeric().withMessage("price is required"),
	check("quantity").isNumeric().withMessage("quantity is required"),
	check("categoryId").isNumeric().withMessage("categoryId is required"),
	check("sku").isString().withMessage("sku is required"),
	check("pricePublic").isNumeric().withMessage("pricePublic is required"),
	check("categoryId")
		.optional()
		.isNumeric()
		.withMessage("categoryId is required"),
	check("brandId").optional().isNumeric().withMessage("brandId is required"),
	handleValidator,
];

export const validateGetProducts = [
	param("limit").isNumeric().withMessage("limit is required"),
	param("page").isNumeric().withMessage("page is required"),
	param("idStore").isNumeric().withMessage("idStore is required"),
	handleValidator,
];
