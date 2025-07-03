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
    select: {
      id: true,
      name: true,
      domain: true,
      createdAt: true,
      updatedAt: true,
      logoUrl: true,
      address: true,
      phone: true,
      email: true,
      description: true,
      tiktok: true,
      instagram: true,
      facebook: true,
      twitter: true,
      youtube: true,
      city: true,
      department: true,
      zip: true,
      bannerUrl: true,
      userId: false,
    }
  });
  prisma.$disconnect();
  return store;
};

export { getStoreByDomain, getStoreById };
