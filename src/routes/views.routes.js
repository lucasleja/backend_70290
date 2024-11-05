import express from 'express'
import ProductManager from '../services/ProductManager.js'

const router = express.Router()
const prodManag = new ProductManager()

router.get('/', async(req, res)=>{
    const products = await prodManag.getAllProducts()
    res.render('home', {products})
})

router.get('/realtimeproducts', (req, res)=> {
    res.render('realTimeProducts')
})

export default router












/* import express from 'express'
import ProductManager from '../services/ProductManager.js'

const router = express.Router()

// Creamos una instancia de ProductManager
const prodManag = new ProductManager()

router.get('/', async(req, res)=>{
    try {
        const products = await prodManag.getAllProducts()
        res.render('home', {products})
    } catch (error) {
        console.error('Error al cargar productos:', error)
        res.status(500).render('error', {message: 'Hubo un problema al cargar los productos'})
    }
})

router.get('/realtimeproducts', (req, res)=> {
    try {
        const products = await prodManag.getAllProducts()
        res.render('realTimeProducts', {products})
    } catch (error) {
        console.error('Error al cargar productos:', error)
        res.status(500).render('error', {message: 'Hubo un problema al cargar los productos'})
    }
})

export default router
 */






/* import express from 'express'
import ProductManager from '../services/ProductManager.js'

const router = express.Router()
const prodManag = new ProductManager()

router.get('/', async(req, res)=>{
    const products = await prodManag.getAllProducts()
    res.render('home', {products})
})

router.get('/realtimeproducts', (req, res)=> {
    res.render('realTimeProducts')
})

export default router */










// src/routes/views.routes.js

/* import express from 'express'
import ProductManager from '../services/ProductManager.js'

const router = express.Router()

// Instancia de ProductManager
const prodManag = new ProductManager()

router.get('/', async (req, res) => {
    try {
        const products = await prodManag.getAllProducts()
        res.render('home', { products })
    } catch (error) {
        console.error('Error al obtener productos:', error)
        res.status(500).json({ message: 'Error interno' })
    }
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
})

export default router
 */

