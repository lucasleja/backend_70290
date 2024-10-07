import express from 'express';
import cartsRoutes from './routes/carts.route.js'
import productsRoutes from './routes/products.router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = 8080;

app.use('/api/carts', cartsRoutes)
app.use('/api/products', productsRoutes)


app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${PORT}`);
})