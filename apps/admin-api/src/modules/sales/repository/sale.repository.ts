import salesModel from '@shared/models/sale/sale.model';
import { Types } from 'mongoose';
import { CreateSale, Sale, UpdateSale } from '@shared/types/sale.types';

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

const updateStatusSale = async (storeId: number, saleId: Types.ObjectId, statusId: number) => {
  const sale = await salesModel.findOneAndUpdate(
    { storeId, _id: saleId },
    { $set: { statusId, updatedAt: new Date() } },
    { new: true }
  );
  return sale?.toJSON() as unknown as Sale;
};

const getSalesByStore = async (
  storeId: number,
  page: number,
  limit: number,
  q: string,
  statusesId: number[],
  dates: {start: string, end: string}
) => {
  const filter: any = { storeId }

  if (statusesId.length > 0) {
    filter.statusId = { $in: statusesId }
  }
  if (q){
    filter.$expr = {
      $regexMatch: {
        input: { $toString: "$_id" },
        regex: q,
        options: "i",
      },
    };
  }
  if (dates.start && dates.end) {
    filter.createdAt = {
      $gte: dates.start,
      $lte: dates.end,
    }
  }

  const [sales, total] = await Promise.all([
    salesModel
      .find(filter)
      .sort({ sequential: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    salesModel.countDocuments(filter)
  ])

  return {
    sales: sales as unknown as Sale[],
    total
  };
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
