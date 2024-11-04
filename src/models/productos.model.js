import mongoose from "mongoose";

const productosCollection = 'productos'

const productosSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    status: { type: Boolean, default: true },
    stock: Number,
    category: String,
    thumbnails: [{ type: String }]
});

const productosModel = mongoose.model(productosCollection, productosSchema)

export default productosModel;
