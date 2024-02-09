import { prisma } from "@config/prisma/prisma";
import { StoreCreate, StoreUpdate } from "../types/store.types";

export const create = async (body: StoreCreate) => {
	return await prisma.stores.create({
		data: {
			bannerUrl: body.bannerUrl,
			logoUrl: body.logoUrl,
			name: body.name,
			address: body.address,
			phone: body.phone,
			email: body.email,
			city: body.city,
			zip: body.zip,
			userId: body.userId,
			domain: body.domain,
		},
	});
};

export const update = async (id: number, body: StoreUpdate) => {
	return await prisma.stores.update({
		where: {
			id,
		},
		data: {
			...body,
		},
	});
};
