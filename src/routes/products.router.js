/* import express from 'express'; */

import { Router } from 'express'

import ProductManager from '../services/ProductManager.js';

/* const router = express.Router(); */

const router = Router()



const prodManager = new ProductManager()

router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
        const page = parseInt(req.query.page)
        const category = req.query.category
        const sort = parseInt(req.query.sort)
        const products = await prodManager.getProducts(limit, page, category, sort)
        res.send(products)
    } catch (err) {
        res.status(400).send({error:err})
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const prodId = req.params.pid
        const product = await prodManager.getProduct(prodId)
        if (product !== undefined) res.send(product)
        if (product === undefined) res.status(404).send({error: 'product not found' })
    } catch (err) {
        res.status(400).send({error:err})
    }
})

/* router.post('/', uploader.single('img'), async (req, res) => {
    try {
        let { title, description, code, price, stock, category } = req.body
        const img = req.file
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).send({error: 'incomplete data' })
        } else {
            price = parseInt(price)
            stock = parseInt(stock)
            const prodAdded = await prodManager.setProduct({ title, description, code, price, stock, category }, img)
            res.status(201).send(prodAdded)
        }
    } catch (err) {
        res.status(400).send({error:err})
    }
})

router.put('/:pid', uploader.single('img'), async (req, res) => {
    try {
        const productId = req.params.pid
        const img = req.file
        let modifiedProduct = req.body
        const newProduct = await prodManager.editProduct(productId, modifiedProduct, img)
        if (newProduct !== undefined) res.status(201).send(newProduct)
        if (newProduct === undefined) res.status(404).send({error: 'product not found' })
    } catch(err) {
        res.status(400).send({error:err})
    }
}) */

router.delete('/:pid', async (req, res) => {
    try {
        const prodId = req.params.pid
        const deletedProd = await prodManager.deleteProduct(prodId)
        if (deletedProd !== undefined) res.send(deletedProd)
        if (deletedProd === undefined) res.status(404).send({error: 'product not found' })
    } catch(err) {
        res.status(400).send({error:err})
    }
})

export default router


// GET
/* router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
        const page = parseInt(req.query.page)
        const category = req.query.category
        const sort = parseInt(req.query.sort)
        const products = await prodManager.getProducts(limit, page, category, sort)
        res.send(products)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos" });
    }
}); */

/* router.get('/:pid', async (req, res) => {
    try {
        const prodId = req.params.pid
        const product = await prodManager.getAllProduct(prodId)
        if (product !== undefined) res.send(product)
        if (product === undefined) res.status(404).send({error: 'product not found' })
    } catch (err) {
        res.status(400).send({error:err})
    }
}) */

// GET
/* router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await ProductManager.getAllProducts(limit);
        res.send({ result: "success", payload: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos" });
    }
}); */

// POST
/* router.post('/', async (req, res) => {
    try {
        const newProduct = await ProductManager.addProduct(req.body);
        res.status(201).send({ result: "success", payload: newProduct });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error al crear el producto" });
    }
}); */



// PUT
/* router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await ProductManager.updateProduct(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.send({ result: "success", payload: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
}); */

// DELETE
/* router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await ProductManager.deleteProduct(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.send({ result: "success", payload: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
}); */

/* export default router; */