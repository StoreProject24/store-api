export interface User {
	id: string;
	name: string;
	email: string;
	password?: string;
	urlImage: string;
	role: string;
	otpCode: string;
	statusId: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserCreate {
	name: string;
	email: string;
	password: string;
	urlImage: string;
}
