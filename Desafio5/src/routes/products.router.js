import { Router } from "express";
import Product from '../dao/fileManagers/products.js';
import fs from "fs"


const router = Router();
const productsManager = new Product();
const productsFilePath = './dao/archivoHL/productos.json'

// Obtener todos los productos

router.get('/', async (req, res) => {
    let products = await productsManager.getAll();
    res.send({ status: "success", payload: products })
})

// Obtener un producto por ID

router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    let product = await productsManager.getProductById(productId);
    res.send(product);
});

// agrego un nuevo producto 

router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;
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

        const result = await productsManager.addProduct(productToAdd)

        res.send({ status: "succes", message: "Producto agregado con exito!!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
})

export default router;