import { prisma } from "@config/prisma/prisma";

export const findUserById = async (id: number) => {
  const user = await prisma.users.findMany({
    where: {
      id,
    },
    select:{
        id: true,
        email: true,
        name: true,
        role: true,
        urlImage: true
    }
  });
  await prisma.$disconnect();
  return user;
};
