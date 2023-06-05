import express from 'express'
import ProductManager from '../src/ProductManager.js';

const app = express();

app.use(express.urlencoded({ extended: true }))

const productManager = new ProductManager();

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getAllProcucts(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'servidor error' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: 'producto no encontrado' });
    }
});

app.listen(8080, () => { console.log('server arriba') })