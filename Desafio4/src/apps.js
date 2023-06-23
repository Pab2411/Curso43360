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
app.use('/', viewRouter(socketServer));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

socketServer.on('connection', socket => {
    console.log('nuevo cliente conectado')

    
})

