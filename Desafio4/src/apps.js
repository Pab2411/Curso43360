import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewRouter from './router/views.router.js'
import { Server } from 'socket.io';
import fs from 'fs'
import productsRouter from './router/products.router.js'
import cartsRouter from './router/carts.router.js'

const app = express();
const httpserver = app.listen(8080, () => console.log('server arriba'))

const socketServer = new Server(httpserver)

// middleware de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))
app.use('/', viewRouter);

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

socketServer.on('connection', socket => {
    console.log('nuevo cliente conectado')

    const productsFilePath = './archivoHL/productos.json';

    socket.on('addProduct', async (newProduct) => {
        try {
            const { title, description, code, price, stock, category, thumbnails } = newProduct;
            if (!title || !description || !code || !price || !stock || !category) {
                socket.emit('productError', { error: 'Todos los campos son obligatorios' })
                return;
            }

            
            const productsData = await fs.promises.readFile(productsFilePath, 'utf-8');
            const products = JSON.parse(productsData);

            const lastProduct = products[products.length - 1];
            const productId = lastProduct ? lastProduct.id + 1 : 1;

            const productToAdd = {
                id: productId,
                title,
                description,
                code,
                price,
                stock,
                category,
                thumbnails: Array.isArray(thumbnails) ? thumbnails : [thumbnails]
            };

            products.push(productToAdd);
            await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2));
            socketServer.emit('productAdded', newProduct);
            console.log(newProduct)

        } catch (error) {
            console.error(error);
            socket.emit('productError', { error: 'Error al agregar el producto' });
        }
    })



    socket.on('deleteProduct', async (productId) => {
        console.log(productId)
        try {
            const productsData = await fs.promises.readFile(productsFilePath, 'utf-8');
            let products = JSON.parse(productsData);

            const pId = parseInt(productId);
            const index = products.findIndex((p) => p.id === pId);
            if (index !== -1){
                 products.splice(index, 1);
                 await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2));
            }
                // Envía el ID del producto eliminado a todos los clientes conectados
                socketServer.emit('productDeleted', productId);
            } catch (error) {
            console.error(error);
            socket.emit('productError', { error: 'Error al eliminar el producto' });
        }
    });
})

