import {prisma} from '@stores-api/db'

export const findUserById = async (id: number) => {
  const user = await prisma.users.findMany({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      urlImage: true,
    },
  });
  await prisma.$disconnect();
  return user;
};
