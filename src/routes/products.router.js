import express from 'express';
import ProductManager from '../services/ProductManager.js';

const router = express.Router();

// GET
router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await ProductManager.getAllProducts(limit);
        res.send({ result: "success", payload: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos" });
    }
});

// POST
router.post('/', async (req, res) => {
    try {
        const newProduct = await ProductManager.addProduct(req.body);
        res.status(201).send({ result: "success", payload: newProduct });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error al crear el producto" });
    }
});

// PUT
router.put('/:id', async (req, res) => {
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
});

// DELETE
router.delete('/:id', async (req, res) => {
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
});

export default router;