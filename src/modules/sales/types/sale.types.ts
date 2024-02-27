export interface Sale {
	_id: string;
	sequential: number;
	items: SaleItem[];
	total: number;
	storeId: number;
	idUser: number | null;
	status: SaleStatus["status"];
}

export interface CreateSale {
	sequential: number;
	items: SaleItem[];
	total: number;
	storeId: number;
	idUser: number | null;
}

export interface SaleItem {
	productId: string;
	productName: string;
	discount: number;
	quantity: number;
	price: number;
	total: number;
}

export interface UpdateSale {
	items?: SaleItem[];
	total?: number;
}

export interface SaleStatus {
	status: "active" | "deleted" | "completed" | "cancelled";
}
