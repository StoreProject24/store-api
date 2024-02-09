import {
	create,
	deleteBrand,
	getBrands,
	updateImage,
	updateName,
} from "../repository/brands.repository";
import {
	CreateBrand,
	GetBrands,
	UpdateBrand,
	UpdateBrandImage,
} from "../types/brands.types";
import { BrandRepository } from "./brands.interface";

export class BrandsDomain implements BrandRepository {
	async createBrand(body: CreateBrand) {
		return await create(body);
	}
	async updateNameBrand(data: UpdateBrand) {
		return await updateName(data);
	}
	async updateImageBrand(data: UpdateBrandImage) {
		return await updateImage(data);
	}

	async deleteBrand(id: number, storeId: number) {
		return await deleteBrand(id, storeId);
	}

	async getBrands(data: GetBrands) {
		return await getBrands(data);
	}
}
