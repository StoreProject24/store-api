import { prisma } from '@stores-api/db';

const getProductsByPage = async (page: number, limit: number, storeId: number, q: string, categoryIds: number[]) => {
  const [products, total] = await prisma.$transaction([
    prisma.products.findMany({
      where: {
        storeId,
        statusId: 1,
        name: {
          contains: q,
          mode: 'insensitive',
        },
        categoryId: {
          in: categoryIds.length > 0 ? categoryIds : undefined,
        },
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
        // variants: true,
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
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: productId,
        storeId,
        statusId: 1,
      },
      select: {
        id: true,
        name: true,
        description: true,
        pricePublic: true,
        quantity: true,
        images: {
          select: {
            urlImage: true,
            id: true,
            productId: true,
          }
        },
        storeId: true,
        sku: true,
        tags: true,
        video: true,
        brandId: true,
        categoryId: true,
        variantTypes: {
          select: {
            name: true,
            id: true,
            options: true,
          },
        },
        variantCombinations: {
          where: {
            status: true
          },
          select: {
            values: {
              select: {
                optionId: true,
                option: true,
                combination: true,
                id: true
              },
            },
            price: true,
            pricePublic: true,
            sku: true,
            status: true,
            quantity: true,
            id: true
          },
        },
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
  } catch (error) {
    console.log("error ", error)
  }
};

const getProductsByIds = async (storeId: number, ids: number[]) => {
  console.log('ids', ids);
  const products = await prisma.products.findMany({
    where: {
      id: { in: ids },
      storeId,
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

const getProductsRandomByStore = async (storeId: number, limit: number) => {
  const products = await prisma.products.findMany({
    where: { storeId, statusId: 1 },
    orderBy: { id: 'desc' },
    take: limit,
  });
  return products;
};

const getRelatedProducts = async (storeId: number, productId: number, categoryId: number, limit: number) => {
  const products = await prisma.products.findMany({
    where: {
      storeId,
      statusId: 1,
      categoryId,
      id: {
        not: productId,
      },
    },
    orderBy: { id: 'desc' },
    take: limit,
  });
  return products;
};

export { getProductsByPage, getProductByIdAndStore, getProductsByIds, updateProductsQuantity, getProductsRandomByStore, getRelatedProducts };
