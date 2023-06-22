const socket = io();

document.addEventListener('DOMContentLoaded', () => {


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

const productList = document.getElementById('productList')

// renderizado del producto agregado
/*
socket.on('productAdded', newProduct => {
    console.log('Nuevo producto agregado:', newProduct);
    const listItem = document.createElement('li');
    listItem.textContent = newProduct.title;
    productList.appendChild(listItem);
});
*/
//prueba

socket.on('productAdded', newProduct => {
    console.log('Nuevo producto agregado:', newProduct);
    const listItem = document.createElement('li');
    listItem.setAttribute('data-id', newProduct.id); // Agrega el atributo data-id al elemento li
    listItem.innerHTML = `
        <button class="deleteButton" id="deleteButton-${newProduct.id}">Eliminar</button>
        ${newProduct.title}
    `;
    productList.appendChild(listItem);
});



/*
socket.on('nuevoProducto',products =>{
    console.log(products)
    products.forEach((product)=>{
        const listItem=document.createElement('li');
        listItem.textContent=product.title;
        productList.appendChild(listItem);
    })
});
*/

// borado de producto

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('deleteButton')) {
        const productId = event.target.parentNode.getAttribute('data-id');
        deleteProduct(productId);
    }
});

function deleteProduct(productId) {
    // Envía id al servidor
    socket.emit('deleteProduct', productId);
}

// renderizado del producto ya borrado

socket.on('productDeleted', productId => {
    console.log('Producto eliminado:', productId);
    const listItem = document.querySelector(`li[data-id="${productId}"]`);
    if (listItem) {
        listItem.remove();
    }
});