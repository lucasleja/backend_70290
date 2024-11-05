/* import mongoose from "mongoose";

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
 */






import mongoose from "mongoose";

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

const productosModel = mongoose.model(productosCollection, productosSchema);

export default productosModel;




