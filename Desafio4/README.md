# Desafío 4 - Vista de productos en tiempo real

Este proyecto tiene como objetivo implementar una vista en tiempo real de los productos agregados. Se utilizan dos vistas diferentes: "home.handlebars" y "realTimeProducts.handlebars".

## Descripción de las vistas

### home.handlebars

La vista "home.handlebars" muestra una lista de todos los productos agregados hasta el momento. Esta vista no utiliza websockets y se renderiza de manera estática.

### realTimeProducts.handlebars

La vista "realTimeProducts.handlebars" se encuentra en el endpoint "/realtimeproducts" en el router de vistas. Esta vista también muestra una lista de productos, pero utiliza websockets para actualizar automáticamente la lista cada vez que se crea o elimina un producto.

## Tecnologías utilizadas

- Node.js
- Express.js
- Handlebars
- Socket.IO

## Instrucciones de instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias ejecutando el siguiente comando:
3. Abre tu navegador web y accede a la siguiente URL:
http://localhost:8080/realtimeproducts

## Postman carga de producto

http://localhost:8080/realTimeProducts

## Postman Borrar un producto con ID

http://localhost:8080/realTimeProducts/1