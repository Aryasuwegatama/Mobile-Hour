import express from 'express';
import * as productController from '../controllers/productController.js';
import * as staffController from "../controllers/staffController.js"
import * as orderController from "../controllers/orderController.js"
import access_control from '../access_control.js';


const router = express.Router();

// Middleware to handle notifications
router.use((req, res, next) => {
    res.locals.notification = req.session.notification;
    delete req.session.notification;
    next();
});

router.get("/", (req, res) => {
    res.redirect("/homepage")
});
router.get("/homepage", productController.displayHomepage);

router.get('/homepage/brand', productController.productListBrand);

router.get('/search', productController.handleSearch);

router.get("/product_details/:id", productController.showProductDetail);



// PRODUCT ADMIN
router.get('/product_admin', access_control(["manager", "staff"]), productController.showAllProductsAdmin);

// Delete product by ID
router.post('/delete-product/:id', productController.deleteProductById);

// Render add product page
router.get('/add_product', productController.addProductPage);
// Add new product
router.post('/add_product', productController.createNewProduct);

// Render edit product page
router.get('/edit-product/:id', productController.editProductPage);
// Update product
router.post('/update-product/:id', productController.updateProduct);

// product list filter
router.get('/product_admin/filter', productController.filterProducts);



// STAFF ADMIN ROUTES
router.get('/staff_admin', access_control(["manager"]), staffController.showStaffAdminPage);

router.get('/add_staff', staffController.addStaffPage);
router.post('/add_staff', staffController.createStaff);

// Edit staff page
router.get('/edit-staff/:id', access_control(['manager']), staffController.editStaffPage);
// Update staff information
router.post('/update-staff/:id', access_control(['manager']), staffController.updateStaff);


router.post('/delete-staff/:id', access_control(['manager']), staffController.deleteStaff);

// STAFF LOGIN AND LOG OUT ROUTES

router.get('/staff_login', staffController.showLoginPage);
  
router.post('/staff_login', staffController.authUserLogin);

router.post('/logout', staffController.userLogout);


// ORDER ADMIN ROUTES
// GET route for order admin page
router.get('/order_admin', access_control(["manager", "staff"]), orderController.getOrderAdmin);



export default router;
