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
    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            console.log('Error: Producto no encontrado');
            return;
        }

        return product;
    }

}


const productManager = new ProductManager(archivo);

const products = productManager.getProducts();
console.log(products);

productManager.addProduct({
    title: "producto prueba 9",
    description: "Este es un producto prueba 3",
    price: 400,
    thumbnail: "Sin imagen",
    code: "abc5",
    stock: 27
})



/*

const product = productManager.getProductById(1);
console.log(product);
*/