export interface Category {
  id: number;
  name: string;
  urlImage: string;
  emoji: string;
  statusId: number;
  storeId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCategory = Omit<Category, 'id'>;


export interface UpdateImageCategory {
  categoryId: number;
  storeId: number;
  urlImage: string;
}