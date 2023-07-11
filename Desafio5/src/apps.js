import express from "express";
import __dirname from './utils.js';

import viewRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js'
//import usersRouter from './routes/users.router.js'
import handlebars from 'express-handlebars'

import mongoose from 'mongoose';

const app = express();
const PORT = 8080;

mongoose.set('strictQuery', false)
//const connection = mongoose.connect("mongodb+srv://pablosivina:pabloG2411@prueba.hni2pod.mongodb.net/?retryWrites=true&w=majority")

mongoose.connect("mongodb+srv://pablosivina:pabloG2411@prueba.hni2pod.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
        const server = app.listen(PORT, () => console.log('Servidor arriba en el puerto', PORT));
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
//app.use('/api/users', usersRouter)


//const server = app.listen(PORT, () => console.log('server arriba'))


/*

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(config.mongoDB.URL);
        console.log("Connected to Mongo Atlas");
    } catch (error) {
        console.log("Error en la conexión con Mongo Atlas", error);
    }
};

connectMongoDB();

app.use(express.json())

app.use('/api/users', userRouter);

*/