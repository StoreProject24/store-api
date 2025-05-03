import { prisma } from '@stores-api/db';

const getStoreByDomain = async (domain: string) => {
  const store = await prisma.stores.findUnique({
    where: {
      domain,
    },
    select: {
      id: true,
      name: true,
      domain: true,
    },
  });
  prisma.$disconnect();
  return store;
};

const getStoreById = async (id: number) => {
  const store = await prisma.stores.findUnique({
    where: {
      id,
    },
  });
  prisma.$disconnect();
  return store;
};

export { getStoreByDomain, getStoreById };
