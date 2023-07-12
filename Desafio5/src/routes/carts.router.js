import { Router } from "express";
import Cart from '../dao/dbManager/carts.js';

const router = Router();
const cartManager = new Cart();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const result = await cartManager.createCart();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

// Obtener productos de un carrito por su ID

router.get('/:cartId', async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const result = await cartManager.getCartById(cartId);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los productos del carrito' });
    }
  });

  // agrego un producto al carrito
  
  router.post('/:cartId/products/:productId', async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const productId = req.params.productId;
  
      const result = await cartManager.addProductToCart(cartId, productId);
  
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
  });

export default router;