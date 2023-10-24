import * as productModel from '../models/productModel.js';

// async function runTests() {
//   try {
//     // Define sample productData and featureData
//     const productData = {
//       product_name: 'Sample Product 3',
//       product_brand: 'Sample Brand 3',
//       price: 1899,
//       stock_quantity: 34
//     };

//     const featureData = {
//       weight: 240,
//       dimensions: '5.5 x 2.8 x 0.3 inches',
//       OS: 'IOS16',
//       screensize: 6.2,
//       resolution: '1080x2340',
//       chipset: 'A Bionic 17',
//       ram: 8,
//       storage_capacity: 512,
//       battery_capacity: 4000,
//       rear_camera: '108 MP',
//       front_camera: '48 MP'
//     };

//     const productId = await createProduct(productData, featureData);

//     if (typeof productId === 'number' && productId > 0) {
//       console.log('Test Passed: Product created successfully.');
//     } else {
//       console.error('Test Failed: Product creation failed.');
//     }
//   } catch (error) {
//     console.error('Test Failed:', error);
//   }
// }

// runTests();


// Simple testing function for getBySearch model function
async function testGetBySearch() {
  try {
    const keyword = 'apple'; 

    const searchResults = await productModel.getBySearch(keyword);
    console.log('Search Results:', searchResults);
  } catch (error) {
    console.error('Error occurred during testing:', error);
  }
}

// Call the testing function
testGetBySearch();