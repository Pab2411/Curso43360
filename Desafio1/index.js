

class ProductManager {
    constructor() {
        this.products = []
        this.productId = 1;
    }

    addProduct = (title, description, price, thumbnail, code, stock
    ) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log('Error:Todos los campos son obligatorios');
            return;
        }

        const codeExist = this.products.some((p) => p.code === product.code);
        if (codeExist) {
            console.log(`Error: Ya existe un producto con el código ${product.code}`)
            return;
        }

        const newProduct = { id: this.productId, ...product };
        this.products.push(newProduct);
        this.productId++;
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


const productManager = new ProductManager();

const products = productManager.getProducts();
console.log(products);

productManager.addProduct("producto prueba 2", "Este es un producto prueba 3", 400, "Sin imagen", "abc123", 27);


const product = productManager.getProductById(1);
console.log(product);




