import salesModel from '~models/sale/sale.model';
import { CreateSale, SaleStatus, UpdateSale } from '../types/sale.types';

const createSale = async (newSale: CreateSale) => {
  const sale = await salesModel.create({
    ...newSale,
  });
  return sale;
};

const getSaleBySequential = async (storeId: number, sequential: number) => {
  const sale = await salesModel.findOne({
    storeId,
    sequential,
  });
  return sale;
};

const getLastSaleSequential = async (storeId: number) => {
  const sale = await salesModel
    .findOne({
      storeId: storeId,
    })
    .sort({ sequential: -1 });
  return sale;
};

const updateSale = async (storeId: number, sequential: number, data: UpdateSale) => {
  const sale = await salesModel.findOneAndUpdate(
    { storeId, sequential },
    {
      $set: {
        ...data,
        updatedAt: new Date(),
      },
    },
    { new: true }
  );
  return sale;
};

const updateUserSale = async (storeId: number, sequential: number, idUser: number) => {
  const sale = await salesModel.findOneAndUpdate(
    { storeId, sequential },
    { $set: { idUser, updatedAt: new Date() } },
    { new: true }
  );
  return sale;
};

const changeSaleStatus = async (storeId: number, sequential: number, status: string) => {
  const sale = await salesModel.findOneAndUpdate(
    { storeId, sequential },
    { $set: { status, updatedAt: new Date() } },
    { new: true }
  );
  return sale;
};

const getSalesByStore = async (storeId: number, page: number, limit: number, status: SaleStatus | null) => {
  let params = {};
  if (status) {
    params = {
      status,
    };
  }
  const sales = await salesModel
    .find({ storeId, params })
    .skip((page - 1) * limit)
    .limit(limit);
  return sales;
};

export default {
  createSale,
  getSaleBySequential,
  getLastSaleSequential,
  updateSale,
  getSalesByStore,
  changeSaleStatus,
  updateUserSale,
};
