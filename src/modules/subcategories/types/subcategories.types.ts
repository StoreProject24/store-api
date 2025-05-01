export interface Subcategory {
    id: number;
    name: string;
    statusId: number;
    categoryId: number;
    storeId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type CategoryCreate = Omit<Subcategory, 'id'>