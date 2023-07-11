
import fs from 'fs';

productsFilePath = './dao/archivoHL/productos.json'

export default class Product {
    constructor() {
        console.log(`Trabando en el archivos ${productsFilePath}`)
    }

    // todos los productos y opcion a cantidad

    getAll = async () => {
        if (fs.existsSync(productsFilePath)) {
            try {
                let productsData = await fs.promises.readFile(productsFilePath, 'utf-8');
                return JSON.parse(productsData);
            } catch (error) {
                console.log("No puede guardar el archivo:" + error);
                return null;
            }
        } else {
            return [];
        }
    }

    // selecciono un producto por ID

    getProductById = async (productId) => {
        try {
            const productsData = await fs.promises.readFile(productsFilePath, 'utf-8');
            const products = JSON.parse(productsData);
            const product = products.find((p) => p.id === productId);
            if (product) {
                return { status: 'success', payload: product };
            } else {
                return { error: 'Producto no encontrado' };
            }
        } catch (error) {
            console.error(error);
            return { error: 'Error al obtener el producto' };
        }
    }

    // agrego un nuevo producto

    addProduct = async (productData) => {
        try {
            const { title, description, code, price, stock, category, thumbnails } = productData;
            if (!title || !description || !code || !price || !stock || !category) {
                return { error: 'Todos los campos son obligatorios' };
            }

            await fs.promises.appendFile(productsFilePath, JSON.stringify(productData) + '\n');

            return { status: "success", message: "Producto agregado con exito!!" };
        } catch (error) {
            console.error(error);
            return { error: 'Error al agregar el producto' };
        }
    }

    // actualizo producto por id segun campos en body

    updateProduct = async (productId, updatedData) => {
        try {
            const { title, description, code, price, stock, category, thumbnails } = updatedData;
            if (!title && !description && !code && !price && !stock && !category) {
                return { error: 'Necesita ingresar al menos un campo para poder modificar' };
            }

            const productsData = await fs.promises.readFile(productsFilePath, 'utf-8');
            let products = JSON.parse(productsData);
            const productIndex = products.findIndex((p) => p.id === productId);
            if (productIndex !== -1) {
                products[productIndex] = { ...products[productIndex], ...updatedData };
                await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2));
                return { status: "success", message: "Producto actualizado con exito!!" };
            } else {
                return { error: 'Producto no encontrado' };
            }
        } catch (error) {
            console.error(error);
            return { error: 'Error al actualizar el producto' };
        }
    }

    // elimino un producto por Id

    deleteProduct = async (productId) => {
        try {
            const productsData = await fs.promises.readFile(productsFilePath, 'utf-8');
            let products = JSON.parse(productsData);
            const productIndex = products.findIndex((p) => p.id === productId);
            if (productIndex !== -1) {
                const deletedProduct = products.splice(productIndex, 1)[0];
                await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2));
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
