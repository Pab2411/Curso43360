import fs from 'fs'

const archivo = './archivoHL/Usr.json'

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = []
        this.productId = 1;
    }

    async addProduct(newProduct) {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                if (data) {
                    this.products = JSON.parse(data);
                    const lastProduct = this.products[this.products.length - 1];
                    this.productId = lastProduct ? lastProduct.id + 1 : 1;

                    if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) {
                        console.log('Error:Todos los campos son obligatorios');
                        return;
                    }
                    const codeExist = this.products.some((p) => p.code === newProduct.code);
                    if (codeExist) {
                        console.log(`Error: Ya existe un producto con el código ${newProduct.code}`)
                        return;
                    }

                    const productToAdd = { id: this.productId, ...newProduct };

                    this.products.push(productToAdd);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));

                    console.log("Se agrego correctamante el producto")
                }

            } else {
                console.log('Error: El archivo no existe');
            }
        } catch (error) {
            console.log('Error al agregar el producto:', error);
        }
    }
    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                if (data) {
                    this.products = JSON.parse(data);
                    /*console.log(this.products)*/

                    if (!this.products || this.products.length === 0) {
                        console.log('Error: No hay productos');
                    } else {
                        return this.products
                    }

                } else {
                    console.log('Error: No hay productos');
                }
            } else {
                console.log('Error: El archivo no existe')
            }
        } catch (error) {
            console.log("Error No hay productos :", error);

        }
    }
    async getProductById(id) {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                if (data) {
                    this.products = JSON.parse(data);

                    const product = await this.products.find((p) => p.id === id);
                    if (product) {

                        return product;
                    } else {
                        console.log(`Error: Producto no encontrado con el id ${id}`);
                    }

                }
            } else {
                console.log('Error: El archivo no existe')
            }
        } catch (error) {
            console.log("Error el producto no se encontro :", error);
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                if (data) {
                    this.products = JSON.parse(data);

                    const productIndex = this.products.findIndex((p) => p.id === id);
                    if (productIndex === -1) {
                        console.log(`Error: Producto no encontrado con el id ${id}`);
                        return;
                    }

                    const updatedProduct = {
                        ...this.products[productIndex],
                        ...updatedFields,
                    };

                    this.products[productIndex] = updatedProduct;

                    await fs.promises.writeFile(
                        this.path,
                        JSON.stringify(this.products, null, "\t")
                    );

                    console.log("Producto actualizado correctamente");
                    console.log(updatedProduct)
                } else {
                    console.log("Error: No hay productos");
                }
            } else {
                console.log("Error: El archivo no existe");
            }
        } catch (error) {
            console.log("Error al actualizar el producto:", error);
        }
    }

    async deleteProduct(id) {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                if (data) {
                    this.products = JSON.parse(data);

                    const productIndex = this.products.findIndex((p) => p.id === id);

                    if (productIndex !== -1) {
                        this.products.splice(productIndex, 1);

                        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));

                        console.log('Producto eliminado correctamente');
                    } else {
                        console.log(`Error: No se encontró el producto con el id ${id}`);
                    }
                }
            } else {
                console.log('Error: El archivo no existe');
            }
        } catch (error) {
            console.log('Error al eliminar el producto:', error);
        }
    }


}


const productManager = new ProductManager(archivo);
/*
const products = async () => {

    let resulProd = await productManager.getProducts();
    console.log(resulProd);
}
products();
*/

/*const cargoProducto = async () => {

    await productManager.addProduct({
        title: "producto prueba 09",
        description: "Este es un producto prueba 3",
        price: 1000,
        thumbnail: "Sin imagen",
        code: "ab111",
        stock: 30
    })
}
cargoProducto()
*/

/*
const buscoProducConId = async () => {

    let resultProdConId = await productManager.getProductById(3);
    console.log(resultProdConId)
}
buscoProducConId()
*/

/*
const modificoProdconId = async () => {
    await productManager.updateProduct(2, { title: "modificado ", price: 900 })
}
modificoProdconId()
*/

const eliminoConId = async () => {
    await productManager.deleteProduct(2)
}
eliminoConId()

