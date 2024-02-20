import { prisma } from "@config/prisma/prisma";
import logger from "@config/logger/logger";

const main = async () => {
	// CREATE STATUS
	await prisma.status.createMany({
		data: [
			{
				id: 1,
				name: "ACTIVE",
			},
			{
				id: 1,
				name: "INACTIVE",
			},
		],
	});
};

main()
	.then(async () => {
		await prisma.$disconnect();
		logger.info("Seed completed");
	})
	.catch(async (error) => {
		await prisma.$disconnect();
		logger.error(error);
		process.exit(1);
	});
