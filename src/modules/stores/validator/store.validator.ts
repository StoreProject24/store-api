import { handleValidator } from "@config/helpers";
import { check, param } from "express-validator";

export const validatioCreateStore = [
	check("name").isString().withMessage("name is required"),
	check("address").isString().withMessage("address is required"),
	check("domain").isString().withMessage("domain is required"),
	check("phone").isString().withMessage("phone is required"),
	check("email").isEmail().withMessage("email is required"),
	check("city").isString().withMessage("city is required"),
	check("zip").isString().withMessage("zip is required"),
	check("bannerUrl").isString().withMessage("bannerUrl is required"),
	check("logoUrl").isString().withMessage("logoUrl is required"),
	check("userId").isNumeric().withMessage("userId is required"),
	handleValidator,
];

export const validatioUpdateStore = [
	check("name").optional().isString().withMessage("name is required"),
	check("address").optional().isString().withMessage("address is required"),
	check("phone").optional().isString().withMessage("phone is required"),
	check("email").optional().isEmail().withMessage("email is required"),
	check("city").optional().isString().withMessage("city is required"),
	check("zip").optional().isString().withMessage("zip is required"),
	check("userId").isNumeric().withMessage("userId is required"),
	check("statusId").isNumeric().withMessage("statusId is required"),
	handleValidator,
];

export const validatioDeleteStore = [
	param("id").isNumeric().withMessage("id is required"),
	handleValidator,
];