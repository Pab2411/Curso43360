const socket = io();

document.addEventListener('DOMContentLoaded', () => {


    socket.on('productAdded', (newProduct) => {

        console.log('Nuevo producto agregado:', newProduct);
    })
})
function addProduct(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value;
    const description = document.querySelector('input[name="description"]').value;
    const code = document.querySelector('input[name="code"]').value;
    const price = document.querySelector('input[name="price"]').value;
    const stock = document.querySelector('input[name="stock"]').value;
    const category = document.querySelector('input[name="category"]').value;
    const thumbnails = document.querySelector('input[name="thumbnails"]').value;

    const newProduct = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
    };

    // Envía el nuevo producto al servidor a través de Socket.io
    socket.emit('addProduct', newProduct);

    // Limpia los campos del formulario
    event.target.reset();
}


