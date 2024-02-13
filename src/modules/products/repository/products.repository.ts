import { prisma } from "@config/prisma/prisma";
import {
	ProductCreate,
	ProductsGet,
	ProductsGetByCategoryId,
} from "../types/products.types";

export const create = async (body: ProductCreate) => {
	const product = await prisma.products.create({
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
	await prisma.$disconnect();
	return product;
};

export const getProducts = async (body: ProductsGet) => {
	const products = await prisma.products.findMany({
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
			productImages: true,
			quantity: true,
			productVariants: true,
			sku: true,
			description: true,
			brands: true,
		},
	});
	await prisma.$disconnect();
	return products;
};

export const getProductsByCategoryId = async (
	body: ProductsGetByCategoryId
) => {
	const products = await prisma.products.findMany({
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
			productImages: true,
			quantity: true,
			productVariants: true,
			sku: true,
			description: true,
			brands: true,
			categories: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});
	await prisma.$disconnect();
	return products;
};

export const getProductById = async (storeId: number, id: number) => {
	const product = prisma.products.findUnique({
		where: {
			storeId,
			id,
			statusId: 1,
		},
		select: {
			id: true,
			name: true,
			pricePublic: true,
			productImages: true,
			quantity: true,
			productVariants: true,
			sku: true,
			description: true,
			brands: true,
			categories: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});
	await prisma.$disconnect();
	return product;
};

export const update = async (id: number, body: ProductCreate) => {
	const product = await prisma.products.update({
		where: {
			id,
		},
		data: {
			name: body.name,
			description: body.description,
			price: body.price,
			quantity: body.quantity,
			categoryId: body.categoryId,
			sku: body.sku,
			pricePublic: body.pricePublic,
			brandId: body.brandId,
			updatedAt: new Date(),
		},
	});
	await prisma.$disconnect();
	return product;
};

export const updateStatusProduct = async (id: number, status: number) => {
	const product = await prisma.products.update({
		where: {
			id,
		},
		data: {
			statusId: status,
			updatedAt: new Date(),
		},
	});
	await prisma.$disconnect();
	return product;
};

export const deleteProduct = async (id: number) => {
	await prisma.products.delete({
		where: {
			id,
		},
	});
	await prisma.$disconnect();
};
