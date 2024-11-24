import asynchandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

//Create new order
//POST /api/orders
//Private access
const addOrders = asynchandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        menu: item._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

//Get logged in user's orders
//GET /api/orders/myorders
//Private access
const getMyOrders = asynchandler(async (req, res) => {  
  const orders = await Order.find({ user:req.user._id});
  res.status(200).json(orders);
});

//Get order by  ID
//GET /api/orders/:id
//Private access
const getOrderById = asynchandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found')
  }
});

//Update order to paid
//PUT /api/orders/:id/pay
//Private access
const updateOrderToPaid = asynchandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.paid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found')
  }
});

//Update order to delivered
//PUT /api/orders/:id/delivered
//Private/Admin access
const updateOrderToDelivered = asynchandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.delivered = true;
    order.deliveredAt =  Date.now();

    const updateOrder = await order.save();

    res.status(200).json(updateOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//Get all orders
//GET /api/orders
//Private/Admin access
const getOrders = asynchandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Order.countDocuments();

  const orders = await Order.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
    res.json({ orders, page, pages: Math.ceil(count / pageSize) });

  // const orders = await Order.find({}).populate('user', 'id name');
  // res.status(200).json(orders);
});

export {
  addOrders,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
