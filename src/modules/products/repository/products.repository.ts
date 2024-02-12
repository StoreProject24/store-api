import { prisma } from "@config/prisma/prisma";
import {
	ProductCreate,
	ProductsGet,
	ProductsGetByCategoryId,
} from "../types/products.types";

export const create = async (body: ProductCreate) => {
	return await prisma.products.create({
		data: {
			storeId: body.storeId,
			name: body.name,
			description: body.description,
			price: body.price,
			quantity: body.quantity,
			categoryId: body.categoryId,
			sku: body.sku,
			pricePublic: body.pricePublic,
			brandId: body.brandId,
			statusId: 1,
		},
	});
};

export const getProducts = async (body: ProductsGet) => {
	return await prisma.products.findMany({
		skip: (body.page - 1) * body.limit,
		take: body.limit,
		where: {
			statusId: 1,
			storeId: body.storeId,
		},
		select: {
			id: true,
			name: true,
			pricePublic: true,
			ProductImages: true,
			quantity: true,
			ProductVariants: true,
			sku: true,
			description: true,
			Brands: true,
			_count: true,
			Categories: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});
};

export const getProductsByCategoryId = async (
	body: ProductsGetByCategoryId
) => {
	return await prisma.products.findMany({
		skip: (body.page - 1) * body.limit,
		take: body.limit,
		where: {
			statusId: 1,
			categoryId: body.categoryId,
			storeId: body.storeId,
		},
		select: {
			id: true,
			name: true,
			pricePublic: true,
			ProductImages: true,
			quantity: true,
			ProductVariants: true,
			sku: true,
			description: true,
			Brands: true,
			Categories: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});
};

export const getProductById = async (storeId: number, id: number) => {
	return await prisma.products.findUnique({
		where: {
			storeId,
			id,
			statusId: 1,
		},
		select: {
			id: true,
			name: true,
			pricePublic: true,
			ProductImages: true,
			quantity: true,
			ProductVariants: true,
			sku: true,
			description: true,
			Brands: true,
			Categories: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});
};
