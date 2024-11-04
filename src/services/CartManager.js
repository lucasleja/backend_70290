/* import fs from 'fs/promises';
import path from 'path';

const cartsFilePath = path.resolve('data', 'carts.json');

export default class CartManager {
  constructor() {
    this.carts = [];
    this.init();
  }

  async init() {
    try {
      const data = await fs.readFile(cartsFilePath, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
    }
  }

  saveToFile() {
    fs.writeFile(cartsFilePath, JSON.stringify(this.carts, null, 2));
  }

  createCart() {
    const newCartId = this.carts.length ? this.carts[this.carts.length - 1].cartId + 1 : 1;
    const newCart = {
      cartId: newCartId,
      products: [],
    };
    this.carts.push(newCart);
    this.saveToFile();
    return newCart;
  }

  getCartProducts(cartId) {
    const cart = this.carts.find((cart) => cart.cartId === cartId);
    return cart ? cart.products : null;
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.carts.find((cart) => cart.cartId === cartId);
    if (!cart) return null;

    const existingProduct = cart.products.find((product) => product.id === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    this.saveToFile();
    return cart;
  }
} */

  import mongoose from 'mongoose';
  import cartModel from '../models/cart.model.js';
  
  class CartManager {
      static async createCart() {
          const newCart = new cartModel();
          return await newCart.save();
      }
  
      static async getAllCarts() {
          return await cartModel.find().populate('products.product');
      }
  
      static async getCartById(cid) {
          return await cartModel.findById(cid).populate('products.product');
      }
  
      static async addProductToCart(cid, pid, quantity) {
          return await cartModel.findByIdAndUpdate(
              cid,
              { $addToSet: { products: { product: pid, quantity: quantity } } },
              { new: true }
          ).populate('products.product');
      }
  
      static async deleteProductFromCart(cid, pid) {
          return await cartModel.findByIdAndUpdate(
              cid,
              { $pull: { products: { product: pid } } },
              { new: true }
          ).populate('products.product');
      }
  
      static async updateCartProducts(cid, products) {
          return await cartModel.findByIdAndUpdate(
              cid,
              { products: products },
              { new: true }
          ).populate('products.product');
      }
  
      static async updateProductQuantity(cid, pid, quantity) {
          return await cartModel.findOneAndUpdate(
              { _id: cid, 'products.product': pid },
              { $set: { 'products.$.quantity': quantity } },
              { new: true }
          ).populate('products.product');
      }
  
      static async deleteCart(cid) {
          return await cartModel.findByIdAndDelete(cid);
      }
  }
  
  export default CartManager;
  