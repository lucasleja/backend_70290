/* import mongoose from 'mongoose'; */

import productosModel from '../models/productos.model.js';

/* const ProductModel = mongoose.model('Product', productosSchema); */

import __dirname from '../utils.js'

export default class ProductManager {

    async getProduct(limit, page, category, sort) {
        try {
            if (!limit) limit = 10
            if (!page) page = 1
            if (category) {
                if (sort) {
                    const products = await productosModel.paginate({category: category}, {limit: limit, page: page, lean:true, sort: {price: sort}})
                    return products
                } else {
                    const products = await productosModel.paginate({category: category}, {limit: limit, page: page, lean:true})
                    return products
                }
            } else {
                if (sort) {
                    const products = await productosModel.paginate({}, {limit: limit, page: page, lean:true, sort: {price: sort}})
                    return products
                } else {
                    const products = await productosModel.paginate({}, {limit: limit, page: page, lean:true})
                    return products
                }
            }
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    async getProduct(id) {
        try {
            const product = await productosModel.findOne({_id: id})
            return product
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    async setProduct(product, img) {
        try {
            const newProduct = {
                ...product,
                status: true,
            }
            if (img) {
                newProduct.thumbnails = [`${__dirname}/public/img/${img.filename}`]
            } else {
                newProduct.thumbnails = []
            }
            productosModel.create(newProduct)
            return newProduct
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    async editProduct(productId, modifiedProduct, img) {
        try {
            const product = await productosModel.findOne({_id: productId})
            let {title,description,code,price,stock,category,status,thumbnails} = product
            let newProduct = {
                    title,
                    description,
                    code,
                    price,
                    stock,
                    category,
                    status,
                    thumbnails,
                    ...modifiedProduct
                }
            if (img) {
                newProduct.thumbnails.push(`${__dirname}/public/img/${img.filename}`)
            }
            await productosModel.updateOne({_id: productId}, { $set: newProduct})
        return newProduct
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    async deleteProduct(id) {
        try {
            const deleteProduct = await productosModel.deleteOne({_id: id})
            return deleteProduct
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }
}



























/* class ProductManager {
    static async getAllProducts(limit) {
        if (limit) {
            return await ProductModel.find().limit(limit);
        }
        return await ProductModel.find().lean();
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
 */






// En src/services/ProductManager.js


/* import mongoose from 'mongoose';

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
    static async getAllProducts(filter = {}, sortOption = {}, skip = 0, limit = 10) {
        const products = await ProductModel.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limit)
            .lean();
        
        return products;
    }

    // ... resto de los métodos sin cambios ...

    static async countDocuments(filter = {}) {
        return await ProductModel.countDocuments(filter);
    }
}

export default ProductManager;
 */

