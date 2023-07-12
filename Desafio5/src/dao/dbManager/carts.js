import cartModel from '../models/carts.js' 



export default class Carts {
  constructor() {
    console.log("Estamos trabajando con bd mongo");
  }

  createCart = async () => {
    try {
      const newCart = new cartModel();
      const result = await newCart.save();
      return { status: "success", message: "Carrito generado con éxito" };
    } catch (error) {
      console.error(error);
      return { error: "Error al crear el carrito" };
    }
  };

  // obtengo productos de un carrito por Id

  getCartById = async (cartId) => {
    try {
      const cart = await cartModel.findOne({ _id: cartId }).lean();

      if (!cart) {
        return { error: 'Carrito no encontrado' };
      }

      return { status: 'success', payload: cart.products };
    } catch (error) {
      console.error(error);
      return { error: 'Error al obtener los productos del carrito' };
    }
  };

  // agrego un producto al carrito

  addProductToCart = async (cartId, productId) => {
    try {
      if (!cartId || !productId) {
        return { error: 'Los parámetros cartId y productId son obligatorios' };
      }

      const cart = await cartModel.findById(cartId);

      if (!cart) {
        return { error: 'Carrito no encontrado' };
      }

      const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);

      if (productIndex !== -1) {
        //console.log('Antes de incrementar: ', cart.products[productIndex].quantity);

        cart.products[productIndex].quantity = parseInt(cart.products[productIndex].quantity)+1;
        
       // console.log('Después de incrementar: ', cart.products[productIndex].quantity);

      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }

     // await cart.save();

     await cartModel.updateOne({ _id: cart._id }, cart);

      return { status: 'success', message: 'Producto agregado' };
    } catch (error) {
      console.error(error);
      return { error: 'Error al agregar el producto al carrito' };
    }
  };
}







