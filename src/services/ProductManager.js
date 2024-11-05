import mongoose from 'mongoose';

const productosSchema = new mongoose.Schema({
    title: String,
    price: Number,
    thumbnail: String,
    stock: Number,
    description: String,
    category: String,
    status: Boolean
}, { timestamps: true });

const ProductModel = mongoose.model('Product', productosSchema);

class ProductManager {
    static async getAllProducts(limit) {
        if (limit) {
            return await ProductModel.find().limit(limit);
        }
        return await ProductModel.find();
    }

    static async getProductById(id) {
        return await ProductModel.findById(id);
    }

    static async addProduct(productData) {
        const newProduct = new ProductModel(productData);
        return await newProduct.save();
    }

    static async updateProduct(id, updatedFields) {
        return await ProductModel.findByIdAndUpdate(id, updatedFields, { new: true });
    }

    static async deleteProduct(id) {
        return await ProductModel.findByIdAndDelete(id);
    }
}

export default ProductManager;





