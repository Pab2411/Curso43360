const socket = io();

socket.on('productsUpdated',(products)=>{
console.log('script llegada',products)
    
    const productList = document.getElementById('productList');
    productList.innerHTML='';

    products.forEach((product)=>{
        const listItem=document.createElement('li');
        listItem.innerText =product.title;
        productList.appendChild(listItem);
    })
})

