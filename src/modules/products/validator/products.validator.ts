import { handleValidator } from "@config/helpers";
import { check, param, query } from "express-validator";

export const validationCreateProduct = [
	check("name").isString().withMessage("name is required"),
	check("description").isString().withMessage("description is required"),
	check("price").isNumeric().withMessage("price is required"),
	check("quantity").isNumeric().withMessage("quantity is required"),
	check("sku").isString().withMessage("sku is required"),
	check("pricePublic").isNumeric().withMessage("pricePublic is required"),
	check("categoryId")
		.optional()
		.isNumeric()
		.withMessage("categoryId is required"),
	check("brandId").optional().isNumeric().withMessage("brandId is required"),
	handleValidator,
];

export const validatorGetProducts = [
	query("limit").isNumeric().withMessage("limit is required"),
	query("page").isNumeric().withMessage("page is required"),
	param("idStore").isNumeric().withMessage("idStore is required"),
	handleValidator,
];

export const validatorGetProductById = [
	param("idStore").isNumeric().withMessage("idStore is required"),
	param("idProduct").isNumeric().withMessage("idProduct is required"),
	handleValidator,
]

export const validatorUpdateProduct = [
	param("idProduct").isNumeric().withMessage("idProduct is required"),
	check("name").isString().withMessage("name is required"),
	check("description").isString().withMessage("description is required"),
	check("price").isNumeric().withMessage("price is required"),
	check("quantity").isNumeric().withMessage("quantity is required"),
	check("sku").isString().withMessage("sku is required"),
	check("pricePublic").isNumeric().withMessage("pricePublic is required"),
	check("categoryId")
		.optional()
		.isNumeric()
		.withMessage("categoryId is required"),
		handleValidator
]

export const validatorChangeStatusProduct = [
	param("idProduct").isNumeric().withMessage("idProduct is required"),
	check("status").isNumeric().withMessage("status is required"),
	handleValidator,
];