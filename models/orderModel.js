import { db } from "../database.js";



// Function to get all orders
export function getAllOrders() {
    return db.query('SELECT * FROM `orders`');
}

// Function to get order by ID
export function getOrderById(orderId) {
    return db.query('SELECT * FROM `orders` WHERE order_id = ?', [orderId]);
}

// Function to get order by status
export function getOrdersByStatus(status) {
    return db.query('SELECT * FROM orders WHERE order_status = ?', [status])
      .then(([result]) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }

// Function to create a new order
export function createOrder(orderData) {
    return db.query('INSERT INTO `orders` SET ?', orderData);
}

// Function to update an existing order
export function updateOrder(orderId, orderData) {
    return db.query('UPDATE `orders` SET ? WHERE order_id = ?', [orderData, orderId]);
}

// Function to delete an order
export function deleteOrder(orderId) {
    return db.query('DELETE FROM `orders` WHERE order_id = ?', [orderId]);
}
