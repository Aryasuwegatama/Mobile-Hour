import * as test from "./models/staffModel.js";
import * as orderModel from './models/orderModel.js';


// async function testGetByUsername() {
//   try {
//     const username = 'arya'; 
//     const user = await test.getByUsername(username);
//     console.log('User found:', user);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// testGetByUsername();


// Testing the function to get all orders
orderModel.getAllOrders()
    .then((orders) => {
        console.log('All Orders:', orders);
    })
    .catch((error) => {
        console.error('Error retrieving orders:', error);
    });

// Testing the function to get order by ID
const testOrderId = 1; // Replace with the desired order ID
// orderModel.getOrderById(testOrderId)
//     .then((order) => {
//         console.log(`Order with ID ${testOrderId}:`, order);
//     })
//     .catch((error) => {
//         console.error(`Error retrieving order with ID ${testOrderId}:`, error);
//     });

// Example data for a new order
const newOrderData = {
    order_date: '2023-09-30 12:00:00',
    order_status: 'in process',
    customer_id: 1 // Replace with the desired customer ID
};

// Testing the function to create a new order
// orderModel.createOrder(newOrderData)
//     .then((result) => {
//         console.log('New order created. Result:', result);
//     })
//     .catch((error) => {
//         console.error('Error creating a new order:', error);
//     });

// Example data for updating an existing order
const updatedOrderData = {
    order_status: 'delivered', // Replace with the desired updated data
    order_delivery_date: '2023-10-3 12:00:00',

}; 

// Testing the function to update an existing order
const testUpdatedOrderId = 1; // Replace with the desired order ID to update
// orderModel.updateOrder(testUpdatedOrderId, updatedOrderData)
//     .then((result) => {
//         console.log(`Order with ID ${testUpdatedOrderId} updated. Result:`, result);
//     })
//     .catch((error) => {
//         console.error(`Error updating order with ID ${testUpdatedOrderId}:`, error);
//     });

// Testing the function to delete an order
const testDeletedOrderId = 2; // Replace with the desired order ID to delete

orderModel.deleteOrder(testDeletedOrderId)
    .then((result) => {
        console.log(`Order with ID ${testDeletedOrderId} deleted. Result:`, result);
    })
    .catch((error) => {
        console.error(`Error deleting order with ID ${testDeletedOrderId}:`, error);
    });





