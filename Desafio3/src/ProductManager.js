import fs from 'fs'

const productos = '../archivoHL/Usr.json'

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getAllProcucts(limit) {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);

            if (limit) {
                return products.slice(0, parseInt(limit));
            } else {
                return products;
            }
        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {

        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            const parsedProductoId = parseInt(productId)
            const product = products.find(p => p.id === parsedProductoId);

            if (!product) {
                throw new Error('Producto no encontrado');
            }
            return product;
        } catch (error) {
            throw error;
        }
    }



}

export default ProductManager