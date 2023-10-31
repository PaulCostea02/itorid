import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Order from "../models/Order";

const createOrder = (req: Request, res: Response, next: NextFunction) => {
    const { order_status, order_total, user_id, restaurant_id } = req.body;

    const order = new Order({
        _id: new mongoose.Types.ObjectId,
        order_status,
        order_total,
        user_id,
        restaurant_id,
    });

    return order.save()
        .then((order) => res.status(201).json({ order }))
        .catch((err) => res.status(500).json({ err }));
};

const readOrder = (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;

    return Order.findById(orderId)
        .then((order) => order ? res.status(200).json({ order }) : res.status(404).json({ message: 'Order not found' }))
        .catch((err) => res.status(500).json({ err }));
};


const readAllOrders = (req: Request, res: Response, next: NextFunction) => {
    return Order.find()
        .then((orders) => res.status(200).json({ orders }))
        .catch((err) => res.status(500).json({ err }));
};

const updateOrder = (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;

    return Order.findById(orderId)
        .then((order) => {
            if (order) {
                order.set(req.body);
                return order.save()
                    .then((order) => res.status(200).json({ order }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        })
        .catch((err) => res.status(500).json({ err }));
};

const deleteOrder = (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;

    return Order.findByIdAndDelete(orderId)
        .then((order) => order ? res.status(200).json({ message: 'Order deleted successfully' }) : res.status(404).json({ message: 'Order not found' }))
        .catch((err) => res.status(500).json({ err }));
};

export default { createOrder, readAllOrders, readOrder, updateOrder, deleteOrder };
