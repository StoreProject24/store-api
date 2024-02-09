import { check, param } from "express-validator";

import { Request, Response, NextFunction } from "express";
import { handleValidator } from "@config/helpers";

export const validateLogin = [
	check("email").isEmail().withMessage("Email is required"),
	check("password").isLength({ min: 6 }).withMessage("Password is required"),
	handleValidator,
];

export const validateRegister = [
	check("email").isEmail().withMessage("Email is required"),
	check("password").isLength({ min: 6 }).withMessage("Password is required"),
	check("name").isString().withMessage("Name is required"),
	check("urlImage").isString().withMessage("Url image is required"),
	handleValidator,
];

export const validateForgotPassword = [
	check("email").isEmail().withMessage("Email is required"),
	handleValidator,
];

export const validateVerifyOtp = [
	check("email").isEmail().withMessage("Email is required"),
	check("otpCode").isString().withMessage("Otp code is required"),
	handleValidator,
];

export const validateResetPassword = [
	check("email").isEmail().withMessage("Email is required"),
	check("password").isLength({ min: 6 }).withMessage("Password is required"),
	check("otpCode").isString().withMessage("Otp code is required"),
	handleValidator,
];
