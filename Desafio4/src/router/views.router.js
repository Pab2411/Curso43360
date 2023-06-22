import express from 'express'
import fs from 'fs'

const router = express.Router();

const productsFilePath = './archivoHL/productos.json';

/*
router.get('/home', async (req, res) => {
    res.render('home',{})
})
*/

// creo ruta home

router.get('/home', async (req, res) => {
    try {
        const productsData = await fs.promises.readFile(productsFilePath, 'utf-8');
        const products = JSON.parse(productsData);

        res.render('home', { products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });

    }
});




// Ruta para la vista en tiempo real

router.get('/realTimeProducts', async (req, res) => {
    try {
        const productsData = await fs.promises.readFile(productsFilePath, 'utf-8');
        const products = JSON.parse(productsData);

        res.render('realTimeProducts', { products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });

    }
});

// agrego un nuevo producto 
/*
router.post('/realTimeProducts', async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = newProduct;
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' })
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

        // res.render('realTimeProducts', { products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
})
*/
export default router;

