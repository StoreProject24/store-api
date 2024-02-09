export {};

declare global {
	namespace Express {
		interface Request {
			user: {
				id: string;
				rol: "ADMINSTORE" | "USER" | "ADMIN";
				storeId: number;
			};
		}
	}
}
