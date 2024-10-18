import express from 'express';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import cartsRoutes from './routes/carts.route.js'
import productsRoutes from './routes/products.router.js'
import __dirname from './utils.js';
import viewsRouter from './routes/views.routes.js'
import ProductManager from './services/ProductManager.js'


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + "/public"))




const PORT = 8080;

app.use('/api/carts', cartsRoutes)
app.use('/api/products', productsRoutes)

app.use('/', viewsRouter)


/* app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${PORT}`);
}) */

const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

const io = new Server(httpServer)

const prodManag = new ProductManager()

io.on('connection', async (socket)=>{
    const products = await prodManag.getAllProducts()
    socket.emit('productsList', products)

    socket.on('deleting-product', id=>{
        prodManag.deleteProduct(id)
    })

    socket.on('new-product', product=>{
        prodManag.setProduct(product)
    })
})