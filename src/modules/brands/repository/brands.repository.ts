import { prisma } from "@config/prisma/prisma";
import {
	CreateBrand,
	GetBrands,
	UpdateBrand,
	UpdateBrandImage,
} from "../types/brands.types";

export const create = async (body: CreateBrand) => {
	const response = prisma.brands.create({
		data: {
			name: body.name,
			urlImage: body.urlImage,
			storeId: body.storeId,
			statusId: 1,
		},
	});
	await prisma.$disconnect();
	return response;
};

export const updateName = async (data: UpdateBrand) => {
	const response = prisma.brands.update({
		where: {
			id: data.id,
			storeId: data.storeId,
		},
		data: {
			name: data.name,
		},
	});
	await prisma.$disconnect();
	return response;
};

export const updateImage = async (data: UpdateBrandImage) => {
	const response = prisma.brands.update({
		where: {
			id: data.id,
			storeId: data.storeId,
		},
		data: {
			urlImage: data.urlImage,
		},
	});
	await prisma.$disconnect();
	return response;
};

export const deleteBrand = async (id: number, storeId: number) => {
	const response = prisma.brands.delete({
		where: {
			id,
			storeId,
		},
	});
	await prisma.$disconnect();
	return response;
};

export const getBrands = async (data: GetBrands) => {
	const response = prisma.brands.findMany({
		where: {
			storeId: data.storeId,
			statusId: {
				in: data.statusIds,
			},
		},
	});
	await prisma.$disconnect();
	return response;
};
