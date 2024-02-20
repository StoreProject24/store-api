import { Schema, model } from "mongoose";

const itemsSchema = new Schema({
	productId: {
		type: Number,
		required: true,
	},
	productName: {
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
	total: {
		type: Number,
		required: true,
	},
});

const userSchema = new Schema({
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
		type: String,
		required: false,
	},
});

export const saleSchema = new Schema({
	_id: Schema.Types.ObjectId,
	sequential: {
		type: Number,
		required: true,
	},
	items: [itemsSchema],
	total: {
		type: Number,
		required: true,
	},
	storeId: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		enum: ["active", "deleted", "completed", "cancelled"],
		default: "active",
	},
	user: userSchema,
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});


const salesModel =  model("sales", saleSchema);

export default salesModel
// Para la parte del admin, tambien hay personas que atienden a los clientes
// Se podria crear un panel donde ellos pudieran mirar las ventas, y que ventas tiene cada uno
// Tambien se podria crear un panel para que ellos puedan ver los productos que hay en el almacen
