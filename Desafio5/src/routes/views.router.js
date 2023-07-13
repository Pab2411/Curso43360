import { Router } from "express";
import Products from "../dao/dbManager/products.js";
//import Users from "../dao/dbManager/users.js";

const productsManager = new Products();
//const userManager = new Users();

const router = Router();

/*router.get('/', async (req, res) => {
    let users = await userManager.getAll();
    console.log(users)
    res.render('users', { users })
})
*/
router.get('/products', async (req, res) => {
    let products = await productsManager.getAll();
    // console.log(products)
    res.render('products', { products })
})

router.get('/', (req, res) => {
    res.render('chat', {})
})


export default router;