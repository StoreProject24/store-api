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
      include: {
        brands: true,
        categories:true,
        images: true,
        variantCombinations: {
          include: {
            values: true
          }
        },
        variantTypes: {
          include: {
            options: {
              include: {
                combinationValues: true
              }
            },
          }
        }
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
      include: {
        images: true,
        variantCombinations: {
          include: {
            values: {
              include: {
                combination: true,
                option: true
              }
            }
          }
        },
        variantTypes: {
          include: {
            options: true,
          },
        }
      }
    });
    await prisma.$disconnect();
    return product;
  } catch (error) {
    console.log("error ", error)
  }
};

const getProductsByIds = async (storeId: number, ids: number[]) => {
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
    include: {
      variantTypes: true,
      variantCombinations: true
    },
    orderBy: { id: 'desc' },
    take: limit,
  });
  return products;
};

export { getProductsByPage, getProductByIdAndStore, getProductsByIds, updateProductsQuantity, getProductsRandomByStore, getRelatedProducts };
