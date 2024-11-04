import express from 'express';
import CartManager from '../services/CartManager.js';

const router = express.Router();

// POST /api/carts
router.post('/', async (req, res) => {
    try {
        const newCart = await CartManager.createCart();
        res.status(201).send({ result: "success", payload: newCart });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error al crear el carrito" });
    }
});

// GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
    try {
        const cart = await CartManager.getCartById(req.params.cid);
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        res.send({ result: "success", payload: cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el carrito" });
    }
});

// DELETE /api/carts/:cid/products/:pid
router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const updatedCart = await CartManager.deleteProductFromCart(req.params.cid, req.params.pid);
        if (!updatedCart) {
            return res.status(404).json({ message: "Carrito o producto no encontrado" });
        }
        res.send({ result: "success", payload: updatedCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el producto del carrito" });
    }
});

// PUT /api/carts/:cid
router.put('/:cid', async (req, res) => {
    try {
        const updatedCart = await CartManager.updateCartProducts(req.params.cid, req.body.products);
        if (!updatedCart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        res.send({ result: "success", payload: updatedCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el carrito" });
    }
});

// PUT /api/carts/:cid/products/:pid
router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const updatedCart = await CartManager.updateProductQuantity(req.params.cid, req.params.pid, req.body.quantity);
        if (!updatedCart) {
            return res.status(404).json({ message: "Carrito o producto no encontrado" });
        }
        res.send({ result: "success", payload: updatedCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la cantidad del producto en el carrito" });
    }
});

// DELETE /api/carts/:cid
router.delete('/:cid', async (req, res) => {
    try {
        const deletedCart = await CartManager.deleteCart(req.params.cid);
        if (!deletedCart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        res.send({ result: "success", payload: deletedCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el carrito" });
    }
});

export default router;
