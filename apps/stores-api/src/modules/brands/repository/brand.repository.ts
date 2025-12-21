import { prisma } from '@stores-api/db';

const getBrands = async (storeId: number) => {
  const brands = await prisma.brands.findMany({
    where: {
      storeId,
      statusId: 1,
    },
    select: {
      id: true,
      name: true,
      urlImage: true,
    },
  });
  prisma.$disconnect();
  return brands;
};

export { getBrands };
