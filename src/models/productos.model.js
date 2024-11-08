import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productosCollection = 'productos';

const productosSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    price: { type: Number, min: 0, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, min: 0, required: true },
    category: { type: String, required: true },
    thumbnails: [{ type: String, required: true }]
}, { timestamps: true });

productosSchema.plugin(mongoosePaginate)

const productosModel = mongoose.model(productosCollection, productosSchema);

export default productosModel;




