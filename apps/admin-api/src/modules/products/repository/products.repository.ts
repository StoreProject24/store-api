import { prisma } from '@stores-api/db';
import {
  ProductCreate,
  ProductImages,
  ProductsGet,
  ProductsGetByCategoryId,
} from '@shared/types/product.types';

export const create = async (body: ProductCreate) => {
  const product = await prisma.products.create({
    data: {
      storeId: body.storeId,
      name: body.name,
      description: body.description,
      price: body.price,
      quantity: body.quantity,
      categoryId: body.categoryId,
      sku: body.sku,
      pricePublic: body.pricePublic,
      brandId: body.brandId,
      video: body.video,
      tags: body.tags,
      statusId: 1,
    },
  });
  await prisma.$disconnect();
  return product;
};

export const getProductsByStore = async (body: ProductsGet) => {
  const [products, total] = await prisma.$transaction([
    prisma.products.findMany({
      skip: (body.page - 1) * body.limit,
      take: body.limit,
      where: {
        statusId: 1,
        storeId: body.storeId,
        name: {
          contains: body.q,
          mode: 'insensitive',
        },
      },
      select: {
        name: true,
        brands: true,
        categories: true,
        description: true,
        id: true,
        images: true,
        quantity: true,
        sku: true,
        tags: true,
        video: true,
        status: true,
        pricePublic: true,
      },
    }),
    prisma.products.count({
      where: {
        statusId: 1,
        storeId: body.storeId,
        name: {
          contains: body.q,
          mode: 'insensitive',
        },
      },
    }),
  ]);
  await prisma.$disconnect();
  return { products, total };
};

export const getProducts = async (body: ProductsGet) => {
  const [products, total] = await prisma.$transaction([
    prisma.products.findMany({
      skip: (body.page - 1) * body.limit,
      take: body.limit,
      where: {
        statusId: 1,
        storeId: body.storeId,
        name: {
          contains: body.q,
          mode: 'insensitive',
        },
      },
      include: {
        images: true,
        categories: true,
        brands: true,
        variantTypes: {
          include: {
            options: true,
          },
        },
        variantCombinations: {
          include: {
            values: {
              include: {
                option: true,
              },
            },
          },
        },
      },
    }),
    prisma.products.count({
      where: {
        statusId: 1,
        storeId: body.storeId,
        name: {
          contains: body.q,
          mode: 'insensitive',
        },
      },
    }),
  ]);
  await prisma.$disconnect();
  return { products, total };
};

export const getProductsByCategoryId = async (body: ProductsGetByCategoryId) => {
  const products = await prisma.products.findMany({
    skip: (body.page - 1) * body.limit,
    take: body.limit,
    where: {
      statusId: 1,
      categoryId: body.categoryId,
      storeId: body.storeId,
    },
    select: {
      id: true,
      name: true,
      pricePublic: true,
      images: {
        select: {
          id: true,
          urlImage: true,
        },
      },
      video: true,
      tags: true,
      quantity: true,
      variantTypes: true,
      variantCombinations: true,
      // variants: {
      //   select: {
      //     id: true,
      //     name: true,
      //     price: true,
      //     quantity: true,
      //     sku: true,
      //   },
      // },
      sku: true,
      description: true,
      brands: {
        select: {
          id: true,
          name: true,
          statusId: true,
        },
      },
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  await prisma.$disconnect();
  return products;
};

export const getProductById = async (storeId: number, id: number) => {
  const product = prisma.products.findUnique({
    where: {
      storeId,
      id,
      statusId: 1,
    },
    select: {
      id: true,
      name: true,
      pricePublic: true,
      price: true,
      categoryId: true,
      brandId: true,
      video: true,
      tags: true,
      images: {
        select: {
          id: true,
          urlImage: true,
        },
      },
      quantity: true,
      variantTypes: {
        select: {
          name: true,
          id: true,
          options: true,
        },
      },
      variantCombinations: {
        select: {
          values: {
            select: {
              optionId: true,
              option: true,
              combination: true
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
      sku: true,
      description: true,
      brands: {
        select: {
          id: true,
          name: true,
          statusId: true,
        },
      },
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  await prisma.$disconnect();
  return product;
};

export const createVariantTypes = async (productId: number, types: ProductCreate["variantTypes"]) => {
  const response = Promise.all(
    types.map(type =>{
      if (!type.name) {
        throw new Error("VariantType.name is required");
      }
      return prisma.variantType.create({
        include: { options: true },
        data: {
          name: type.name,
          productId,
          options: {
            create: type.options.map(o => ({
              name: o.name,
              value: o.name
            }))
          }
        }
      })
    }
    )
  );
  await prisma.$disconnect()
  return response;
};


export const createVariantCombinations = async (
  productId: number,
  combinations: ProductCreate["variantCombinations"],
  optionMap: Map<string, number>
) => {
  return Promise.all(
    combinations.map(c =>
      prisma.variantCombination.create({
        include: { values: true },
        data: {
          productId,
          sku: c.sku,
          price: c.price,
          pricePublic: c.pricePublic,
          quantity: c.quantity,
          status: c.status,
          values: {
            create: c.values.map(v => ({
              optionId: optionMap.get(v)
            }))
          }
        }
      })
    )
  );
};

export const getProductByIdProduct = async (id: number) => {
  const product = prisma.products.findUnique({
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return product;
};

export const update = async (id: number, storeId: number, body: ProductCreate) => {
  const product = await prisma.products.update({
    where: {
      id,
      storeId,
    },
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
      quantity: body.quantity,
      categoryId: body.categoryId,
      sku: body.sku,
      pricePublic: body.pricePublic,
      brandId: body.brandId,
      video: body.video,
      tags: body.tags,
      updatedAt: new Date(),
    },
  });
  await prisma.$disconnect();
  return product;
};

export const updateStatusProduct = async (id: number, status: number) => {
  const product = await prisma.products.update({
    where: {
      id,
    },
    data: {
      statusId: status,
      updatedAt: new Date(),
    },
  });
  await prisma.$disconnect();
  return product;
};

export const deleteImagesByProductId = async (id: number) => {
  await prisma.productImages.deleteMany({
    where: {
      productId: id,
    },
  });
};

export const deleteProduct = async (id: number, storeId: number) => {
  await prisma.products.delete({
    where: {
      id,
      storeId,
    },
  });
  await prisma.$disconnect();
};

export const createProductImages = async (productImages: ProductImages['images']) => {
  await prisma.productImages.createMany({
    data: productImages,
  });
  await prisma.$disconnect();
};

export const getImageProductId = async (id: number) => {
  const image = await prisma.productImages.findUnique({
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return image;
};

export const getImagesProductId = async (productId: number) => {
  const images = await prisma.productImages.findMany({
    where: {
      productId,
    },
  });
  await prisma.$disconnect();
  return images;
};

export const deleteImageProduct = async (id: number) => {
  await prisma.productImages.delete({
    where: {
      id,
    },
  });
  await prisma.$disconnect();
};

export const deleteImagesProduct = async (ids: number[]) => {
  await prisma.productImages.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  await prisma.$disconnect();
};

export const validateIsMyProduct = async (id: number, storeId: number) => {
  return await prisma.products.findUnique({
    where: {
      id,
      storeId,
    },
  });
};

export const getProductsByIds = async (storeId: number, ids: number[]) => {
  const products = await prisma.products.findMany({
    where: {
      id: { in: ids },
      storeId,
    },
    // include: {
    //   variants: true,
    // },
  });
  await prisma.$disconnect();
  return products;
};

export const updateProductsQuantity = async (products: { id: number; quantity: number }[]) => {
  await prisma.products.updateMany({
    where: {
      id: { in: products.map((product) => product.id) },
    },
    data: {
      ...products.map((product) => ({
        quantity: product.quantity,
      })),
    },
  });
};
