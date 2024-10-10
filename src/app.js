import express from 'express';
import handlebars from 'express-handlebars'
import cartsRoutes from './routes/carts.route.js'
import productsRoutes from './routes/products.router.js'
import __dirname from './utils.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + "/public"))


// Ruta de prueba para Hbs
app.get('/hello', (req, res) => {
    // usuario de prueba
    const usuario = {
        nombre: 'Lucas',
        email: 'johndoe@example.com',
        edad: 30
    }

    res.render('hello', usuario)
})


const PORT = 8080;

app.use('/api/carts', cartsRoutes)
app.use('/api/products', productsRoutes)


app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${PORT}`);
})