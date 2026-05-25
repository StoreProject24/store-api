import { prisma } from '@stores-api/db';
import { GetSetting, UpdateSetting } from '@shared/types/setting.types';

export const findByStore = async (data: GetSetting) => {
  const response = await prisma.settings.findFirst({
    where: {
      storeId: data.storeId,
    },
  });
  await prisma.$disconnect();
  return response;
};

export const create = async (storeId: number) => {
  const response = await prisma.settings.create({
    data: {
      storeId,
    },
  });
  await prisma.$disconnect();
  return response;
};

export const update = async (id: number, data: UpdateSetting) => {
  const response = await prisma.settings.update({
    where: {
      id,
    },
    data: {
      primaryColor: data.primaryColor,
      secondaryColor: data.secondaryColor,
      show_when_out_of_stock: data.show_when_out_of_stock,
      updatedAt: new Date(),
    },
  });
  await prisma.$disconnect();
  return response;
};
