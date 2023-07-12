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


            /*   const products = await productsModel.find().lean();
   
               const lastProduct = products[products.length - 1];
               const productId = lastProduct ? lastProduct.id + 1 : 1;
   

            const products = await productsModel.find().lean();

            const lastProduct = products[products.length - 1];
            const lastProductId = lastProduct ? lastProduct.id : '0';

            const productId = String(parseInt(lastProductId) + 1).toString();
*/
            const newProduct = new productsModel({
                //id: productId,
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

    // selecciono un producto por ID

    getProductById = async (productId) => {
        try {
            const product = await productsModel.findOne({ id: productId }).lean();
            if (product) {
                return { status: 'success', payload: product };
            } else {
                return { error: 'Producto no encontrado' };
            }
        } catch (error) {
            console.error(error);
            return { error: 'Error al obtener el producto' };
        }
    };

    // actualizo producto por id segun campos en body
    /*
        updateProduct = async (productId, updatedData) => {
            try {
                const { title, description, code, price, stock, category, thumbnails } = updatedData;
                if (!title && !description && !code && !price && !stock && !category) {
                    return { error: 'Necesita ingresar al menos un campo para poder modificar' };
                }
    
                const product = await productsModel.findOne({ id: productId });
                if (product) {
                    const updatedProduct = {
                        ...product.toObject(),
                        ...updatedData
                    };
                    await productsModel.updateOne({ id: productId }, updatedProduct);
                    return { status: "success", message: "Producto actualizado con éxito" };
                } else {
                    return { error: 'Producto no encontrado' };
                }
            } catch (error) {
                console.error(error);
                return { error: 'Error al actualizar el producto' };
            }
        };
    */
    // Borro un producto por ID

    deleteProduct = async (productId) => {
        try {
            const products = await productsModel.find().lean();
            const productIndex = products.findIndex((p) => p.id === productId);
            if (productIndex !== -1) {
                const deletedProduct = products.splice(productIndex, 1)[0];
                await productsModel.deleteOne({ id: productId });
                return { status: "success", message: "Producto borrado", detalle: deletedProduct };
            } else {
                return { error: 'Producto no encontrado' };
            }
        } catch (error) {
            console.error(error);
            return { error: 'Error al eliminar el producto' };
        }
    }
}