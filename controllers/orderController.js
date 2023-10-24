import * as orderModel from '../models/orderModel.js';


export function getOrderAdmin(req, res) {
    orderModel.getOrdersByStatus('in process')
      .then((orders) => {
        res.render('order_admin.ejs', { 
            orders, 
            accessRole: req.session.user.accessRole,
        firstName: req.session.user.firstName,
        });
      })
      .catch((error) => {
        console.error('Error retrieving orders:', error);
        res.render('order_admin.ejs', { orders: [] });
      });
  }