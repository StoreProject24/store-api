import { prisma } from "@config/prisma/prisma";
import {
	ProductCreate,
	ProductImages,
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
			images: {
				select: {
					id: true,
					urlImage: true,
				},
			},
			quantity: true,
			variants: {
				select: {
					id: true,
					name: true,
					price: true,
					quantity: true,
					sku: true,
				},
			},
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
			images: {
				select: {
					id: true,
					urlImage: true,
				},
			},
			quantity: true,
			variants: {
				select: {
					id: true,
					name: true,
					price: true,
					quantity: true,
					sku: true,
				},
			},
			sku: true,
			description: true,
			brands: {
				select: {
					id: true,
					name: true,
					statusId: true,
				},
			},
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
			images: {
				select: {
					id: true,
					urlImage: true,
				},
			},
			quantity: true,
			variants: {
				select: {
					id: true,
					name: true,
					price: true,
					quantity: true,
					sku: true,
				},
			},
			sku: true,
			description: true,
			brands: {
				select: {
					id: true,
					name: true,
					statusId: true,
				},
			},
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

export const getProductByIdProduct = async (id: number) => {
	const product = prisma.products.findUnique({
		where: {
			id,
		},
	});
	await prisma.$disconnect();
	return product;
};

export const update = async (
	id: number,
	storeId: number,
	body: ProductCreate
) => {
	const product = await prisma.products.update({
		where: {
			id,
			storeId,
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

export const createProductImages = async (
	productImages: ProductImages["images"]
) => {
	await prisma.productImages.createMany({
		data: productImages,
	});
	await prisma.$disconnect();
};

export const getImageProductId = async (id: number) => {
	const image = await prisma.productImages.findUnique({
		where: {
			id,
		},
	});
	await prisma.$disconnect();
	return image;
};
export const deleteImageProduct = async (id: number) => {
	await prisma.productImages.delete({
		where: {
			id,
		},
	});
	await prisma.$disconnect();
};
