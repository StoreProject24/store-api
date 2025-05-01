import {prisma} from '@stores-api/db'
import { CreateCategory, UpdateImageCategory } from '../types/category.types';

export const getAll = async (storeId: number) => {
  const categories = await prisma.categories.findMany({
    where: {
      storeId,
    },
    orderBy: {
      id: 'asc',
    },
    include: {
      subCategories: true
    }
  });
  await prisma.$disconnect();
  return categories;
};

export const create = async (storeId: number, body: CreateCategory) => {
  const category = await prisma.categories.create({
    data: {
      ...body,
      storeId,
      statusId: 1,
    },
  });
  await prisma.$disconnect();
  return category;
};

export const update = async (storeId: number, categoryId: number, body: CreateCategory) => {
  const category = await prisma.categories.update({
    where: {
      storeId,
      id: categoryId,
    },
    data: {
      ...body,
      updatedAt: new Date(),
    },
  });
  await prisma.$disconnect();
  return category;
};

export const deleteCategory = async (storeId: number, categoryId: number) => {
  await prisma.categories.delete({
    where: {
      storeId,
      id: categoryId,
    },
  });
  await prisma.$disconnect();
};

export const updateImage = async (body: UpdateImageCategory) => {
  const category = await prisma.categories.update({
    where: {
      storeId: body.storeId,
      id: body.categoryId,
    },
    data: {
      urlImage: body.urlImage,
      updatedAt: new Date(),
    },
  });
  await prisma.$disconnect();
  return category;
};

export const findCategoryId = async (categoryId: number) => {
  const category = await prisma.categories.findUnique({
    where: {
      id: categoryId,
    },
    include: {
      subCategories: true
    }
  });
  await prisma.$disconnect();
  return category;
};
