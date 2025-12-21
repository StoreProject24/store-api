// // import {prisma} from './index.ts'
// // import logger from '~/config/logger/logger';
// import { products } from './productsSeeds';
// // import { prisma } from './index';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// const main = async () => {
//   // CREATE STATUS
//   await prisma.status.createMany({
//     data: [
//       {
//         id: 1,   
//         name: 'ACTIVE',
//       },
//       {
//         id: 2,
//         name: 'INACTIVE',
//       },
//     ],
//   });
//   // const response = await prisma.products.createMany({
//   //   data: products
//   // })
// //   const response = await prisma.sta.createMany({
// //     data: products.map((item) => item.variants).flat()
// //   })
// //   console.log("response ", response)
// };

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//     console.log('Seed completed');
//   })
//   .catch(async (error) => {
//     await prisma.$disconnect();
//     console.log(error);
//     // process.exit(1);
//   });
