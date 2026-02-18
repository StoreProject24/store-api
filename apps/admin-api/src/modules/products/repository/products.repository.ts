import { prisma } from '@stores-api/db';
import {
  Product,
  ProductCreate,
  ProductImages,
  ProductsGet,
  ProductsGetByCategoryId,
  VariantOption,
  VariantType,
} from '@shared/types/product.types';
import { SaleItem } from '@shared/types/sale.types';

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
      orderBy: {
        createdAt: 'desc',
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
      orderBy: {
        createdAt: 'desc',
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
    orderBy: {
      createdAt: 'desc',
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
  const product = await prisma.products.findUnique({
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
          options: {
            where: {
              status: true
            }
          },
        },
      },
      variantCombinations: {
        where: {
          status: true,
        },
        select: {
          id: true,
          price: true,
          pricePublic: true,
          sku: true,
          quantity: true,
          status: true,
          values: {
            select: {
              optionId: true,
              option: true,
            },
          },
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
              value: o.name,
              status: o.status,
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

export const createVariantType = async (productId: number, type: {name: string})=> {
  const newVariantType = await prisma.variantType.create({
    data: {
      name: type.name,
      productId
    },
  });
  await prisma.$disconnect()
  return newVariantType
}

export const updateVariantType = async (productId: number, type: {typeId: number, name: string}) => {
  await prisma.variantType.update({
    where: { id: type.typeId },
    data: { name: type.name },
  });
  await prisma.$disconnect();
}

export const upsertVariantTypes = async (
  productId: number,
  variantTypes: ProductCreate['variantTypes'],
  currentProduct: Product
) => {
  const result: VariantType[] = [];

  const existingTypes = await prisma.variantType.findMany({
    where: { productId },
    include: { options: true },
  });

  const incomingTypeIds = variantTypes
  .filter(t => t.id)
  .map(t => t.id);

  const removedTypes = existingTypes.filter(
    t => !incomingTypeIds.includes(t.id)
  );

  for (const type of removedTypes) {
    // Borrar valores de combinaciones
    await prisma.variantCombinationValue.deleteMany({
      where: {
        option: {
          typeId: type.id,
        },
      },
    });
  
    // Borrar combinaciones que quedaron incompletas
    await prisma.variantCombination.deleteMany({
      where: {
        productId,
        values: {
          none: {}, // combinaciones vacías
        },
      },
    });
  
    // Borrar opciones
    await prisma.variantOption.deleteMany({
      where: { typeId: type.id },
    });
  
    // Borrar el tipo
    await prisma.variantType.delete({
      where: { id: type.id },
    });
  }

  for (const variantType of variantTypes) {
    let variantUpdated: Omit<VariantType, 'options'>;
    const incomingOptionIds: number[] = []

    const exitsVariant = currentProduct.variantTypes.find((item) => item.id === variantType.id)
    if (exitsVariant){
      variantUpdated = await prisma.variantType.update({
        where: {
          id: variantType.id
        },
        data: {
          name: variantType.name,
        },
      })
    }else {
      variantUpdated = await prisma.variantType.create({
        data: {
          name: variantType.name,
          productId
        },
      })
    }

    for (const option of variantType.options) {
      let optionSaved;
        if (exitsVariant?.options.find(item=> item.id === option.id)){
          optionSaved = {
            // @ts-ignore
            variantTypeId: option.typeId,
            ...await prisma.variantOption.update({
              where: {
                id: option.id,
              },
              data: {
                name: option.name,
                value: option.name,
                status: option.status
              }
            })
          }
        }else {
          optionSaved = {
            // @ts-ignore
            variantTypeId: option.typeId,
            ...await prisma.variantOption.create({
              data: {
                name: option.name,
                value: option.name,
                typeId: variantUpdated.id,
                status: option.status
              }
            })
          }
        }
      incomingOptionIds.push(optionSaved.id)
    }

    await prisma.variantOption.updateMany({
      where: {
        typeId: variantUpdated.id,
        id: { notIn: incomingOptionIds }
      },
      data: {
        status: false
      }
    })
    const fullType = await prisma.variantType.findUnique({
      where: {
        id: variantUpdated.id
      },
      include: {
        options: {
          where: {
            status: true
          }
        }
      }
    })
    // @ts-ignore
    result.push(fullType)
  }
  return result;
};

export const upsertVariantCombinations = async (
  productId: number,
  combinations: ProductCreate['variantCombinations'],
  optionMap: Map<string, number>
) => {
  const results = [];

  for (const c of combinations) {
    if (c.id) {
      const updated = await prisma.variantCombination.update({
        where: { id: c.id },
        data: {
          price: c.price,
          pricePublic: c.pricePublic,
          quantity: c.quantity,
          sku: c.sku,
          status: c.status,
        },
        include: { values: true },
      });

      results.push(updated);
    } else {
      const values = Object.entries(c.values).map(([variantName, optionName]) => {
        const key = `${variantName}:${optionName}`;
      
        const optionId = optionMap.get(key);
      
        if (!optionId) {
          throw new Error(`Option not found: ${key}`);
        }
      
        return { optionId };
      });
      const created = await prisma.variantCombination.create({
        include: { values: true },
        data: {
          productId,
          sku: c.sku,
          price: c.price,
          pricePublic: c.pricePublic,
          quantity: c.quantity,
          status: c.status,
          values: {
            create: values,
          },
        },
      });

      results.push(created);
    }
  }

  return results;
};

export const disableMissingCombinations = async (
  productId: number,
  incomingIds: number[]
) => {
  await prisma.variantCombination.updateMany({
    where: {
      productId,
      id: { notIn: incomingIds },
    },
    data: { status: false },
  });
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

export const createProductImages = async (productImages: ProductImages[]) => {
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
  });
  await prisma.$disconnect();
  return products;
};

export const getProductByIdAndCombinationId = async (storeId: number, productId: number, combinationId: number) => {
  const product = await prisma.products.findUnique({
    where: {
      id: productId,
      storeId
    },
    include: {
      images: true
    }
  })
  return product
}

export const updateProductsQuantity = async (items: SaleItem[]) => {
  await prisma.$transaction(async (tx) => {
    for (const item of items) {
      if (item.combinationId) {
        await tx.variantCombination.update({
          where: {id: item.combinationId, productId: item.productId},
          data: {
            quantity: {
              decrement: item.quantity
            }
          }
        })
      }else {
        await tx.products.update({
          where: {id: item.productId},
          data: {
            quantity: {
              decrement: item.quantity
            }
          }
        })
      }
    }
  })
};


export const validateExistSku = async (storeId: number, sku: string, productId?: number) => {
  const exists = await prisma.products.findFirst({
    where: {
      storeId,
      sku
    }
  })

  if (exists?.id === productId){
    return false
  }
  return exists
}

export const restoreProductsQuantity = async (items: SaleItem[]) => {
  await prisma.$transaction(async (tx) => {
    for (const item of items) {
      if (item.combinationId) {
        await tx.variantCombination.update({
          where: {
            id: item.combinationId,
            productId: item.productId,
          },
          data: {
            quantity: {
              increment: item.quantity,
            },
          },
        });
      } else {
        await tx.products.update({
          where: { id: item.productId },
          data: {
            quantity: {
              increment: item.quantity,
            },
          },
        });
      }
    }
  });
};
