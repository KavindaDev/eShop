const {Order} = require('../models/order');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const { OrderItem } = require('../models/order-items');


//get all orders 
router.get(`/` ,async (req, res)=> {
    const orderList = await Order.find().populate('user').sort('dateOrderd');

    if(!orderList) {
        res.status(500).json({success: false})
    }
    res.send(orderList);
})


//get order by id
router.get(`/:id` ,async (req, res)=> {
    const order = await Order.findById(req.params.id)
    .populate('user')
    .populate({
        path: 'orderItems', populate: { 
            path: 'product', populate: 'category'}})
   

    if(!order) {
        res.status(500).json({success: false})
    }
    res.send(order);
})

//post order
router.post(`/`, async (req, res) => {
    const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })
        newOrderItem = await newOrderItem.save();

       return newOrderItem._id;
    }))

    const oderItemsIdsResolved = await orderItemsIds;

 //   console.log(orderItemsIds);

    let order = new Order({

         orderItems: oderItemsIdsResolved, 
        shippingAddress1: req.body.shippingAddress1,
        city: req.body.city,
        country: req.body.country,
        zip: req.body.zip,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        user: req.body.user,
    
    })

   order = await order.save()

    if(!order) 
    return res.status(400).send('The order cannot be placed!!')

    res.send(order);
})

module.exports =router;


trtertert