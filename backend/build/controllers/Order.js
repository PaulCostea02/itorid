"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Order_1 = __importDefault(require("../models/Order"));
const createOrder = (req, res, next) => {
    const { order_status, order_total, user_id, restaurant_id } = req.body;
    const order = new Order_1.default({
        _id: new mongoose_1.default.Types.ObjectId,
        order_status,
        order_total,
        user_id,
        restaurant_id,
    });
    return order.save()
        .then((order) => res.status(201).json({ order }))
        .catch((err) => res.status(500).json({ err }));
};
const readOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    return Order_1.default.findById(orderId)
        .then((order) => order ? res.status(200).json({ order }) : res.status(404).json({ message: 'Order not found' }))
        .catch((err) => res.status(500).json({ err }));
};
const readAllOrders = (req, res, next) => {
    return Order_1.default.find()
        .then((orders) => res.status(200).json({ orders }))
        .catch((err) => res.status(500).json({ err }));
};
const updateOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    return Order_1.default.findById(orderId)
        .then((order) => {
        if (order) {
            order.set(req.body);
            return order.save()
                .then((order) => res.status(200).json({ order }))
                .catch((err) => res.status(500).json({ err }));
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    })
        .catch((err) => res.status(500).json({ err }));
};
const deleteOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    return Order_1.default.findByIdAndDelete(orderId)
        .then((order) => order ? res.status(200).json({ message: 'Order deleted successfully' }) : res.status(404).json({ message: 'Order not found' }))
        .catch((err) => res.status(500).json({ err }));
};
exports.default = { createOrder, readAllOrders, readOrder, updateOrder, deleteOrder };
