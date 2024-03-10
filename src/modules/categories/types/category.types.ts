export type Category = {
  id: number;
  name: string;
  urlImage: string;
  statusId: number;
  storeId: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateCategory {
  name: string;
  urlImage: string;
  statusId: number;
  storeId: number;
}

export interface UpdateImageCategory {
  categoryId: number;
  storeId: number;
  urlImage: string;
}

export interface UpdateCategory {
  id: number;
  name: string;
  urlImage: string;
  statusId: number;
  storeId: number;
}
