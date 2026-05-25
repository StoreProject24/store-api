import { Request } from 'express';
import { prisma } from '@stores-api/db';
import { uploadImages, deleteImages, getSignedImageUrls } from '~services/image/image.service';
import { AppError } from '@shared/helpers/response/response';
import { HttpCode } from '@shared/helpers/response/response.type';

export const findUserById = async (id: number) => {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      phone: true,
      createdAt: true,
      urlImage: true,
    },
  });
  await prisma.$disconnect();
  return user
};


export const updateUser = async (userId: number, dataUser) => {
  const response = await prisma.users.update({
    where: {
      id: userId
    },
    data: {
      ...dataUser
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      phone: true,
      createdAt: true,
      urlImage: true,
    }
  })
  await prisma.$disconnect();
  return response
}

export const updateImage = async (userId: number, urlImage: string) => {
  const response = await prisma.users.update({
    where: {
      id: userId
    },
    data: {
      urlImage
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      phone: true,
      createdAt: true,
      urlImage: true,
    }
  })
  await prisma.$disconnect();
  return response
}
