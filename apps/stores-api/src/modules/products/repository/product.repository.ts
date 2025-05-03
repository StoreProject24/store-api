import { prisma } from '@stores-api/db';

const getProductsByPage = async (page: number, limit: number, storeId: number) => {
  const [products, total] = await prisma.$transaction([
    prisma.products.findMany({
      where: {
        storeId,
        statusId: 1,
      },
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
      where: {
        storeId,
        statusId: 1,
      },
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
  console.log('ids', ids);
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

export { getProductsByPage, getProductByIdAndStore, getProductsByIds, updateProductsQuantity };
