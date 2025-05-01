import salesModel from '~models/sale/sale.model';
import { Types } from 'mongoose';
import { CreateSale, Sale, SaleStatus, UpdateSale } from '../types/sale.types';

const create = async (newSale: CreateSale) => {
  const sale = await salesModel.create(newSale);
  return sale.toObject() as unknown as Sale;
};

const getSaleBySequential = async (storeId: number, sequential: number) => {
  const sale = await salesModel.findOne({
    storeId,
    sequential,
  });
  return sale;
};

const getSaleById = async (storeId: number, saleId: Types.ObjectId) => {
  const sale = await salesModel.findOne({
    storeId,
    _id: saleId,
  });

  return sale;
};

const deleteSale = async (storeId: number, saleId: Types.ObjectId) => {
  await salesModel.deleteOne({
    storeId,
    _id: saleId,
  });
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

const updateStatusSale = async (storeId: number, saleId: Types.ObjectId, status: SaleStatus) => {
  const sale = await salesModel.findOneAndUpdate(
    { storeId, _id: saleId },
    { $set: { status, updatedAt: new Date() } },
    { new: true }
  );
  return sale?.toJSON() as unknown as Sale;
};

const getSalesByStore = async (storeId: number, page: number, limit: number, status: SaleStatus | null) => {
  const filter: { storeId: number; status?: SaleStatus } = { storeId };
  if (status) {
    filter.status = status;
  }
  const sales = await salesModel
    .find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
  return sales as unknown as Sale[];
};

export {
  create,
  getSaleBySequential,
  getLastSaleSequential,
  updateSale,
  getSalesByStore,
  updateStatusSale,
  updateUserSale,
  getSaleById,
  deleteSale,
};
