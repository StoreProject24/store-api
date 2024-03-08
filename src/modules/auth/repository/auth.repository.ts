import { prisma } from "@config/prisma/prisma";
import { UserCreate } from "../types/auth.types";

export const create = async (body: UserCreate) => {
	const user = await prisma.users.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password,
      role: 'ADMINSTORE',
      urlImage: body.urlImage,
      statusId: 1,
      phone: body.phone,
    },
    select: {
      email: true,
      name: true,
      id: true,
      role: true,
      statusId: true,
    },
  });
	await prisma.$disconnect();
	return user;
};

export const findUserByEmail = async (email: string) => {
	const user = await prisma.users.findUnique({
		where: {
			email,
		},
	});
	await prisma.$disconnect();
	return user;
};

export const saveOtpCode = async (email: string, otpCode: string) => {
	const user = await prisma.users.update({
		where: {
			email,
		},
		data: {
			otpCode,
		},
		select: {
			email: true,
			otpCode: true,
		},
	});
	await prisma.$disconnect();
	return user;
};

export const changePassword = async (email: string, password: string) => {
	const user = await prisma.users.update({
		where: {
			email,
		},
		data: {
			password,
		},
	});
	await prisma.$disconnect();
	return user;
};
