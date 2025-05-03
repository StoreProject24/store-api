import { Schema, model } from 'mongoose';
import { SaleStatus } from '../../types/sale.types';

const itemsSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: false,
    },
  },
  {
    _id: false,
  }
);

export const saleSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    sequential: {
      type: Number,
      required: true,
    },
    items: [itemsSchema],
    total: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    storeId: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number || null,
      required: false,
      default: null,
    },
    user: userSchema,
    status: {
      type: String,
      enum: SaleStatus,
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const salesModel = model('sales', saleSchema);

export default salesModel;
