import express from "express";
import __dirname from './utils.js';

import viewRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import handlebars from 'express-handlebars'

import { Server } from 'socket.io';
import http from 'http';

const app = express();
const PORT = 8080;

const server = http.createServer(app);

const io = new Server(server);
import mongoose from 'mongoose';


mongoose.set('strictQuery', false)
//const connection = mongoose.connect("mongodb+srv://pablosivina:pabloG2411@prueba.hni2pod.mongodb.net/?retryWrites=true&w=majority")

mongoose.connect("mongodb+srv://pablosivina:pabloG2411@prueba.hni2pod.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
        server.listen(PORT, () => console.log('Servidor arriba en el puerto', PORT));

    })
    .catch((error) => {
        console.error('Error de conexión a la base de datos:', error);
    });





app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', viewRouter)
app.use('/api/products', productsRouter)
app.use('/api/products/:id', productsRouter)
app.use('/api/carts', cartsRouter);




let messages = [];


io.on('connection', socket => {
    console.log('nuevo cliente conectado');

    socket.on('message', data => {
        messages.push(data)
        io.emit('messageLogs', messages)
        console.log(data)
    })
    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data);
    })
})