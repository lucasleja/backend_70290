import mongoose from "mongoose";
import productosModel from "./productos.model.js";

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'productos' }, // Cambia esto
            quantity: Number
        }
    ]
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
