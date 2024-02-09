export interface Brand {
	id: number;
	name: string;
	urlImage: string;
	storeId: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateBrand {
	name: string;
	urlImage: string;
	storeId: number;
}

export interface UpdateBrand {
	id: number;
	name: string;
    storeId: number;
}

export interface DeleteBrand {
	id: number;
	storeId: number;
}

export interface GetBrands {
	storeId: number;
    statusIds: number[];
}

export interface UpdateBrandImage {
	id: number;
	urlImage: string;
	storeId: number;
}
