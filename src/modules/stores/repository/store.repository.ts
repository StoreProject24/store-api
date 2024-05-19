import { prisma } from '~config/prisma/prisma';
import { StoreCreate, StoreUpdate } from '../types/store.types';

export const create = async (body: StoreCreate) => {
  const store = await prisma.stores.create({
    data: {
      bannerUrl: body.bannerUrl,
      logoUrl: body.logoUrl,
      name: body.name,
      address: body.address,
      phone: body.phone,
      email: body.email,
      city: body.city,
      zip: body.zip,
      userId: body.userId,
      domain: body.domain,
    },
  });
  await prisma.$disconnect();
  return store;
};

export const getById = async (id: number) => {
  const store = await prisma.stores.findUnique({
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return store;
};

export const getByUserId = async (userId: number) => {
  const store = await prisma.stores.findMany({
    where: {
      userId,
    },
  });
  await prisma.$disconnect();
  return store;
};

export const update = async (id: number, body: StoreUpdate) => {
  const store = await prisma.stores.update({
    where: {
      id,
    },
    data: {
      ...body,
    },
  });
  await prisma.$disconnect();
  return store;
};
