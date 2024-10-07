/* import { Router } from "express";

const router = Router()

export default router; */


import express from 'express';
import CartManager from '../services/CartManager.js';

const router = express.Router();
const cartManager = new CartManager();

// POST / - Crear nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al crear carrito' });
  }
});

// GET /:cid - Listar productos del carrito
router.get('/:cid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cartProducts = await cartManager.getCartProducts(cartId);
    res.json(cartProducts);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

// POST /:cid/product/:pid - Agregar producto al carrito
/* router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = req.body.quantity;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Cantidad inválida' });
    }

    const updatedCart = await cartManager.addProductToCart(cartId, productId, quantity);
    res.json(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: 'Carrito o producto no encontrado' });
  }
}); */

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = req.body.quantity;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Cantidad inválida' });
    }

    const updatedCart = await cartManager.addProductToCart(cartId, productId, quantity);
    res.json(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: 'Carrito o producto no encontrado' });
  }
});

export default router;