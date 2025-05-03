import { prisma } from '@stores-api/db';

const getCategories = async (storeId: number) => {
  const categories = await prisma.categories.findMany({
    where: {
      storeId,
      statusId: 1,
      subCategories: {
        every: {
          statusId: 1,
        },
      },
    },
    select: {
      id: true,
      name: true,
      urlImage: true,
      emoji: true,
      subCategories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  prisma.$disconnect();
  return categories;
};

export { getCategories };
