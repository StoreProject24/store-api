export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	quantity: number;
	categoryId: number | null;
	sku: string;
	pricePublic: number;
	brandId: number | null;
	statusId: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface ProductCreate {
	name: string;
	description: string;
	price: number;
	quantity: number;
	categoryId: number;
	sku: string;
	pricePublic: number;
	brandId?: number;
	statusId?: number;
	storeId: number;
}

export interface ProductsGet {
	page: number;
	limit: number;
	storeId: number;
}

export interface ProductsGetByCategoryId {
	page: number;
	limit: number;
	categoryId: number;
	storeId: number;
}

export interface ProductImages {
	images: ImageProduct[];
}

interface ImageProduct {
	productId: number;
	urlImage: string;
}
