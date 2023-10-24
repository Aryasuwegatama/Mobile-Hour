import { db } from "../database.js";

export function newProduct(
  product_id,
  product_name,
  product_brand,
  color,
  price,
  stock_quantity,
  weight,
  dimensions,
  os,
  screensize,
  resolution,
  chipset,
  ram,
  storage_capacity,
  battery_capacity,
  rear_camera,
  front_camera,
) {
  return {
    product_id,
    product_name,
    product_brand,
    color,
    price,
    stock_quantity,
    weight,
    dimensions,
    os,
    screensize,
    resolution,
    chipset,
    ram,
    storage_capacity,
    battery_capacity,
    rear_camera,
    front_camera,
  }
}


export function getAllProducts() {
  return db.query(`SELECT * FROM products INNER JOIN feature ON products.feature_id = feature.feature_id`)
    .then(([result]) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
}

export function getBySearch(keyword) {
  return db.query(
      `SELECT * FROM products WHERE product_name LIKE ? OR product_brand LIKE ?`,
      [`%${keyword}%`, `%${keyword}%`]
    )
    .then(([result]) => {
      console.log(result)
      return result;
    })
    .catch((error) => {
      throw error;
    });
}

// Function to get a single product by ID with its corresponding feature data from the database
export function getProductById(productId) {
  return db.query(
      `SELECT p.*, f.* FROM products AS p INNER JOIN feature AS f ON p.feature_id = f.feature_id WHERE p.product_id = ?`,
      [productId]
    )
    .then(([queryResult]) => {
      
      if (queryResult.length > 0) {
        // get the first matching result
        const result = queryResult[0];
        console.log("log queryResult", queryResult);
        console.log("log queryResult [0]", queryResult[0]);
        
        // convert result into a model object
        return newProduct(
          result.product_id,
          result.product_name,
          result.product_brand,
          result.color,
          result.price,
          result.stock_quantity,
          result.weight,
          result.dimensions,
          result.os,
          result.screensize,
          result.resolution,
          result.chipset,
          result.ram,
          result.storage_capacity,
          result.battery_capacity,
          result.rear_camera,
          result.front_camera
        );
      } else {
        return Promise.reject("no matching results");
      }
    })
    .catch((error) => {
      throw error;
    });
}


// Function to Delete Product
export function deleteProductById(productID) {
  let connection;
  return db.getConnection()
    .then((conn) => {
      connection = conn;
      return connection.beginTransaction();
    })
    .then(() => {
      // Delete the product from the 'products' table
      return connection.query(`DELETE FROM products WHERE product_id = ?`, [productID]);
    })
    .then(() => {
      // Delete the corresponding feature from the 'feature' table
      return connection.query(`DELETE FROM feature WHERE feature_id = (SELECT feature_id FROM products WHERE product_id = ?)`, [productID]);
    })
    .then(() => {
      // Commit the transaction if both deletes are successful
      return connection.commit();
    })
    .catch((error) => {
      if (connection) {
        return connection.rollback()
          .then(() => {
            throw error;
          });
      } else {
        throw error;
      }
    })
    .finally(() => {
      if (connection) {
        connection.release();
      }
    });
}


// Function for Edit Product
export function updateProduct(productId, productData, featureData) {
  let connection;

  return db.getConnection()
    .then((conn) => {
      connection = conn;
      return connection.beginTransaction();
    })
    .then(() => {
      // Update the feature data in the 'feature' table
      return connection.query(
        `UPDATE feature SET 
        weight = ?, 
        dimensions = ?, 
        os = ?, 
        screensize = ?, 
        resolution = ?, 
        chipset = ?, 
        ram = ?, 
        storage_capacity = ?, 
        battery_capacity = ?, 
        rear_camera = ?, 
        front_camera = ? 
        WHERE feature_id = (SELECT feature_id FROM products WHERE product_id = ?)`,
        [
          featureData.weight,
          featureData.dimensions,
          featureData.OS,
          featureData.screensize,
          featureData.resolution,
          featureData.chipset,
          featureData.ram,
          featureData.storage_capacity,
          featureData.battery_capacity,
          featureData.rear_camera,
          featureData.front_camera,
          productId
        ]
      );
    })
    .then(() => {
      // Update the product data in the 'products' table
      return connection.query(
        `UPDATE products SET product_name = ?, product_brand = ?, color = ?, price = ?, stock_quantity = ? WHERE product_id = ?`,
        [
          productData.product_name,
          productData.product_brand,
          productData.color,
          productData.price,
          productData.stock_quantity,
          productId
        ]
      );
    })
    .then(() => {
      return connection.commit();
    })
    .then(() => {
      // Retrieve the updated product data
      return getProductById(productId);
    })
    .catch((error) => {
      if (connection) {
        return connection.rollback()
          .then(() => {
            throw error;
          });
      }
      throw error;
    })
    .finally(() => {
      if (connection) {
        connection.release();
      }
    });
}



export function createProduct(productData, featureData) {
    let connection;
    return db.getConnection()
      .then((conn) => {
        connection = conn;
        return connection.beginTransaction();
      })
      .then(() => {
        // Insert the feature data into the 'feature' table and get the generated feature_id
        return connection.query(
          `INSERT INTO feature (weight, dimensions, OS, screensize, resolution, chipset, ram, storage_capacity, battery_capacity, rear_camera, front_camera) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            featureData.weight,
            featureData.dimensions,
            featureData.OS,
            featureData.screensize,
            featureData.resolution,
            featureData.chipset,
            featureData.ram,
            featureData.storage_capacity,
            featureData.battery_capacity,
            featureData.rear_camera,
            featureData.front_camera
          ]
        );
      })
      .then(([featureResult]) => {
        const featureId = featureResult.insertId;
  
        // Insert the product data into the 'product' table
        return connection.query(
          `INSERT INTO products (product_name, product_brand, color, price, stock_quantity, feature_id) 
          VALUES (?, ?, ?, ?, ?, ?)`,
          [
            productData.product_name,
            productData.product_brand,
            productData.color,
            productData.price,
            productData.stock_quantity,
            featureId
          ]
        );
      })
      .then(([productResult]) => {
        return connection.commit().then(() => {
          return productResult.insertId;
        });
      })
      .catch((error) => {
        if (connection) {
          return connection.rollback().then(() => {
            throw error;
          });
        } else {
          throw error;
        }
      })
      .finally(() => {
        if (connection) {
          connection.release();
        }
      });
  }

  // for product filter
  export function getProductsSortedByBrand() {
    return db.query(
      "SELECT p.product_id, p.product_brand, p.product_name, p.color, f.storage_capacity, p.stock_quantity, p.price FROM products p JOIN feature f ON p.feature_id = f.feature_id ORDER BY p.product_brand"
    ).then(([queryResult]) => {
      return queryResult.map((result) => {
        return {
          product_id: result.product_id,
          product_brand: result.product_brand,
          product_name: result.product_name,
          color: result.color,
          storage_capacity: result.storage_capacity,
          stock_quantity: result.stock_quantity,
          price: result.price,
        };
      });
    });
  }
  
  export function getProductsSortedByStock() {
    return db.query(
      "SELECT p.product_id, p.product_brand, p.product_name, p.color, f.storage_capacity, p.stock_quantity, p.price FROM products p JOIN feature f ON p.feature_id = f.feature_id ORDER BY p.stock_quantity"
    ).then(([queryResult]) => {
      return queryResult.map((result) => {
        return {
          product_id: result.product_id,
          product_brand: result.product_brand,
          product_name: result.product_name,
          color: result.color,
          storage_capacity: result.storage_capacity,
          stock_quantity: result.stock_quantity,
          price: result.price,
        };
      });
    });
  }
  
  export function getProductsSortedByPrice() {
    return db.query(
      "SELECT p.product_id, p.product_brand, p.product_name, p.color, f.storage_capacity, p.stock_quantity, p.price FROM products p JOIN feature f ON p.feature_id = f.feature_id ORDER BY p.price"
    ).then(([queryResult]) => {
      return queryResult.map((result) => {
        return {
          product_id: result.product_id,
          product_brand: result.product_brand,
          product_name: result.product_name,
          color: result.color,
          storage_capacity: result.storage_capacity,
          stock_quantity: result.stock_quantity,
          price: result.price,
        };
      });
    });
  }
  
  export function getProductsByBrand(brandName) {
    return db.query(
      `SELECT p.product_id, p.product_name, p.product_brand, p.color, f.storage_capacity, p.price FROM products p 
      JOIN feature f ON p.feature_id = f.feature_id 
      WHERE p.product_brand = ?`,
      [brandName]
    ).then(([queryResult]) => {
      return queryResult.map((result) => {
        return {
          product_id: result.product_id,
          product_brand: result.product_brand,
          product_name: result.product_name,
          color: result.color,
          storage_capacity: result.storage_capacity,
          price: result.price,
        };
      });
    });
  }