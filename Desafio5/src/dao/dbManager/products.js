import productsModel from '../models/products.js'
import { v4 as uuidv4 } from 'uuid'

export default class Products {
    constructor() {
        console.log("Estamos trabajando con bd mongo")
    }

    getAll = async () => {
        let products = await productsModel.find().lean();
        return products
    }

    addProduct = async (productData) => {
        try {
            const { title, description, code, price, stock, category, thumbnails } = productData;
            if (!title || !description || !code || !price || !stock || !category) {
                return { error: 'Todos los campos son obligatorios' };
            }

            const newProduct = new productsModel({
                id: uuidv4(),
                title,
                description,
                code,
                price,
                stock,
                category,
                thumbnails: Array.isArray(thumbnails) ? thumbnails : [thumbnails]
            });

            const result = await newProduct.save();
            return result;
        } catch (error) {
            console.error(error);
            return { error: 'Error al agregar el producto' };
        }
    };
}