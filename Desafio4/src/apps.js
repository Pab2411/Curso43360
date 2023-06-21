import express from 'express';
import productsRouter from './route/products.router.js';
import cartsRouter from './route/carts.router.js';
import viewRouter from './route/view.router.js';
import handlebars from "express-handlebars";
import __dirname from './utils.js';
import { Server } from 'socket.io';

import fs from 'fs'

const app = express();
const httpserver = app.listen(8080, () => console.log('server arriba'))
const socketServer = new Server(httpserver)



app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewRouter);



socketServer.on('connection', socket => {
    console.log('nuevo cliente conectado');

    socket.on('addProduct', async (newProduct) => {
        try {
            const { title, description, code, price, stock, category, thumbnails } = newProduct;
            if (!title || !description || !code || !price || !stock || !category) {
                socket.emit('productError', { error: 'Todos los campos son obligatorios' })
                return;
            }

            const productsFilePath = 'products.json';
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
            socket.emit('productAdded', newProduct);

        } catch (error) {
            console.error(error);
            socket.emit('productError', { error: 'Error al agregar el producto' });
        }
    })
})



