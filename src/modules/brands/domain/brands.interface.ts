import {
	Brand,
	CreateBrand,
	GetBrands,
	UpdateBrand,
	UpdateBrandImage,
} from "../types/brands.types";

export interface BrandRepository {
	createBrand(body: CreateBrand): Promise<Brand>;
	updateNameBrand(data: UpdateBrand): Promise<Brand>;
	updateImageBrand(data: UpdateBrandImage): Promise<Brand>;
	deleteBrand(id: number, storeId: number): Promise<Brand>;
	getBrands(data: GetBrands): Promise<Brand[]>;
}
