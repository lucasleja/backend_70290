import express from 'express';
import handlebars from 'express-handlebars'
import cartsRoutes from './routes/carts.route.js'
import productsRoutes from './routes/products.router.js'
import __dirname from './utils.js';
import viewsRouter from './routes/views.routes.js'


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


app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${PORT}`);
})