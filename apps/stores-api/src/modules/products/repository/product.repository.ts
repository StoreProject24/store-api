import { prisma } from '@stores-api/db';
import { Prisma } from '@prisma/client';

const getProductsByPage = async (page: number, limit: number, storeId: number, search: string, categoryIds: string | null) => {
  let where: Prisma.ProductsWhereInput = {
    storeId,
    statusId: 1,
    OR: [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { sku: { contains: search, mode: 'insensitive' } },
    ],
  };
  if (categoryIds) {
    where.categoryId = { in: categoryIds.split(',').map(Number) };
  }
  const [products, total] = await prisma.$transaction([
    prisma.products.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        pricePublic: true,
        quantity: true,
        sku: true,
        images: true,
        brands: true,
        variants: true,
        status: true,
        storeId: true,
        video: true,
        tags: true,
        categoryId: true,
        brandId: true,
        statusId: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.products.count({
      where,
    }),
  ]);
  await prisma.$disconnect();
  return { products, total };
};

const getProductByIdAndStore = async (storeId: number, productId: number) => {
  const product = await prisma.products.findUnique({
    where: {
      id: productId,
      storeId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      pricePublic: true,
      quantity: true,
      images: true,
      storeId: true,
      variants: true,
      sku: true,
      tags: true,
      video: true,
      brandId: true,
      categoryId: true,
      categories: {
        select: {
          subCategories: true,
        },
      },
      statusId: true,
    },
  });
  await prisma.$disconnect();
  return product;
};

const getProductsByIds = async (storeId: number, ids: number[]) => {
  const products = await prisma.products.findMany({
    where: {
      id: { in: ids },
      storeId,
    },
    include: {
      variants: true,
    },
  });
  await prisma.$disconnect();
  return products;
};

const updateProductsQuantity = async (products: { id: number; quantity: number }[]) => {
  await Promise.all(
    products.map((product) =>
      prisma.products.update({
        where: { id: product.id },
        data: { quantity: product.quantity },
      })
    )
  );
};

const getRandomProducts = async (storeId: number, limit: number) => {
  const products = await prisma.products.findMany({
    where: { storeId },
    select: {
       id: true,
        name: true,
        description: true,
        pricePublic: true,
        quantity: true,
        sku: true,
        images: true,
        brands: true,
        variants: true,
        status: true,
        storeId: true,
        video: true,
        tags: true,
        categoryId: true,
        brandId: true,
        statusId: true,
        createdAt: true,
        updatedAt: true,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
  return products;
};

const getRelatedProducts = async (storeId: number, productId: number, categoryId: number, limit: number) => {
  const products = await prisma.products.findMany({
    where: { storeId, categoryId, statusId: 1, id: { not: productId } },
    select: {
      id: true,
      name: true,
      description: true,
      pricePublic: true,
      quantity: true,
      brands: true,
      storeId: true,
      sku: true,
      images: true,
      variants: true,
      tags: true,
      video: true,
      brandId: true,
      categoryId: true,
      statusId: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
  return products;
};

export { getProductsByPage, getProductByIdAndStore, getProductsByIds, updateProductsQuantity, getRandomProducts, getRelatedProducts };
