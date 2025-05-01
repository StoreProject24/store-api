// import {prisma} from '@stores-api/db'
// import logger from '~config/logger/logger';
// import { products } from './productsSeeds';

// const main = async () => {
//   // CREATE STATUS
//   // await prisma.status.createMany({
//   //   data: [
//   //     {
//   //       id: 1,
//   //       name: 'ACTIVE',
//   //     },
//   //     {
//   //       id: 2,
//   //       name: 'INACTIVE',
//   //     },
//   //   ],
//   // });
//   // const response = await prisma.products.createMany({
//   //   data: products
//   // })
//   const response = await prisma.productVariants.createMany({
//     data: products.map((item) => item.variants).flat()
//   })
//   console.log("response ", response)
// };

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//     logger.info('Seed completed');
//   })
//   .catch(async (error) => {
//     await prisma.$disconnect();
//     logger.error(error);
//     process.exit(1);
//   });
