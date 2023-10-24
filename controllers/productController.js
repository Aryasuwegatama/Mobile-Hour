
import * as productModel from '../models/productModel.js';


export function displayHomepage(req, res){
  productModel.getAllProducts()
  .then((products) =>{
    res.render("homepage.ejs", {products})
  })
  .catch((error) => {
    console.error(error);
    res.send('Internal Server Error');
  });
}


export function productListBrand(req, res) {
  const brandName = req.query.type;

  productModel.getProductsByBrand(brandName)
    .then((products) => {
      res.json(products); 
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
} 


export function handleSearch(req, res) {

  productModel.getBySearch(req.query.keyword)
    .then(products => {
      console.log(products)
      res.render('homepage.ejs', { products });
    })
    .catch((error) => {
      console.error(error);
      res.render('homepage.ejs', { products });
    });
}


// Display product detail page
export function showProductDetail(req, res) {
  const productId = req.params.id;
  if (productId){
    productModel.getProductById(productId)
    .then(product => {
      // console.log("NEW PRODUCT OBJECT", productModel.newProduct());
        res.render('product_details.ejs', { product })
      })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
  }
}



export function showAllProductsAdmin(req, res) {
  productModel.getAllProducts()
    .then((products) => {
      res.render("product_admin.ejs", { 
        products, 
        accessRole: req.session.user.accessRole,
        firstName: req.session.user.firstName,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send('Internal Server Error');
    });
}


// Delete product by ID
export function deleteProductById(req, res) {
    const productId = req.params.id;
  
    productModel.deleteProductById(productId)
      .then(() => {
        res.redirect('/product_admin');
      })
      .catch((error) => {
        console.error(error);
        res.send('Error deleting the product.'); 
      });
  }

  

 // Display edit product form
 export function editProductPage(req, res) {
    const productId = req.params.id;
  
    productModel.getProductById(productId)
      .then((product) => {
        console.log(product);
        res.render('edit_product.ejs', { product });
      })
      .catch((error) => {
        console.error(error);
        res.send('Internal Server Error');
      });
  }
  
  
  // Update product
  export function updateProduct(req, res) {
    const productId = req.params.id;
    const productData = req.body;
    const featureData = {
      weight: req.body.weight,
      dimensions: req.body.dimensions,
      OS: req.body.OS,
      screensize: req.body.screensize,
      resolution: req.body.resolution,
      chipset: req.body.chipset,
      ram: req.body.ram,
      storage_capacity: req.body.storage_capacity,
      battery_capacity: req.body.battery_capacity,
      rear_camera: req.body.rear_camera,
      front_camera: req.body.front_camera,
    };
  
    productModel.updateProduct(productId, productData, featureData)
      .then((product) => {
        res.render('edit_product.ejs', {product, notification: 'Product updated successfully'})
      })
      .catch((error) => {
        console.error(error);
        res.render('edit_product.ejs', { product: productData, message: 'Error updating the product. Please try again.' });
      });
  }
  
  
// render add product page
export function addProductPage(req, res) {
  res.render("add_product.ejs");
}
// Add new Product
  export function createNewProduct(req, res) {
    const productData = {
      product_name: req.body.product_name,
      product_brand: req.body.product_brand,
      color: req.body.color,
      price: req.body.price,
      stock_quantity: req.body.stock_quantity,
    };
  
    const featureData = {
      weight: req.body.weight,
      dimensions: req.body.dimensions,
      OS: req.body.OS,
      screensize: req.body.screensize,
      resolution: req.body.resolution,
      chipset: req.body.chipset,
      ram: req.body.ram,
      storage_capacity: req.body.storage_capacity,
      battery_capacity: req.body.battery_capacity,
      rear_camera: req.body.rear_camera,
      front_camera: req.body.front_camera,
    };
  
    productModel.createProduct(productData, featureData)
      .then((result) => {
        res.render(`add_product.ejs`, { notification: "Product entered successfully"});
      })
      .catch((error) => {
        console.error(error);
        res.render('add_product', { notification: 'Error creating the product. Please try again.' });
      });
  }


  // for filter product
  export function filterProducts(req, res) {
    const filterType = req.query.type;
    let filterPromise;
  
    switch (filterType) {
      case 'Brand':
        filterPromise = productModel.getProductsSortedByBrand();
        break;
      case 'Stock':
        filterPromise = productModel.getProductsSortedByStock();
        break;
      case 'Price':
        filterPromise = productModel.getProductsSortedByPrice();
        break;
      case 'All':
      default:
        filterPromise = productModel.getAllProducts();
        break;
    }
  
    filterPromise.then((products) => {
        res.json(products);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }
  
  