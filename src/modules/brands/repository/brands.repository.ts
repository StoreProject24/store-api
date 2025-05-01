import { prisma } from '~config/prisma/prisma';
import { Brand, CreateBrand, GetBrands, UpdateBrandImage, UpdateBrand } from '../types/brands.types';

export const create = async (body: CreateBrand) => {
  const response = await prisma.brands.create({
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
  const response = await prisma.brands.update({
    where: {
      id: data.id,
      storeId: data.storeId,
    },
    data: {
      name: data.name,
      updatedAt: new Date(),
    },
  });
  await prisma.$disconnect();
  return response;
};

export const updateImage = async (data: UpdateBrandImage) => {
  const response = await prisma.brands.update({
    where: {
      id: data.id,
      storeId: data.storeId,
    },
    data: {
      urlImage: data.urlImage,
      updatedAt: new Date(),
    },
  });
  await prisma.$disconnect();
  return response;
};

export const deleteBrand = async (id: number, storeId: number) => {
  const response = await prisma.brands.delete({
    where: {
      id,
      storeId,
    },
  });
  await prisma.$disconnect();
  return response;
};

export const getBrands = async (data: GetBrands) => {
  const response = await prisma.brands.findMany({
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

export const findBrandById = async (data: {id: number, storeId: number}) => {
  const response = await prisma.brands.findUnique({
    where: {
      id: data.id,
      storeId: data.storeId,
    },
  });
  await prisma.$disconnect();
  return response;
};
