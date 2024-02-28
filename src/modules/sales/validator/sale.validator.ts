import { check } from "express-validator";
import { handleValidator } from "@config/helpers";

export const validatorCreateSale = [
    check('items').isArray(),
    check('total').isNumeric(),
    check('storeId').isNumeric(),
    handleValidator
]

export const validatorGetSales = [
	check("limit").isNumeric(),
	check("page").isNumeric(),
	check("idStore").isNumeric(),
	handleValidator,
];