import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Restaurant from "../models/Restaurant";

const createRestaurant = (req: Request, res: Response, next: NextFunction) => {
    const { name, address, schedule } = req.body;

    const restaurant = new Restaurant({
        _id: new mongoose.Types.ObjectId,
        name,
        address,
        schedule: schedule,
    })
    return restaurant.save()
        .then(restaurant => res.status(201).json({ restaurant }))
        .catch(err => res.status(500).json({ err }));
};
const readRestaurant = (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;

    return Restaurant.findById(restaurantId)
        .then(restaurant => restaurant ? res.status(201).json({ restaurant }) : res.status(404).json({ message: 'restaurant not found' }))
        .catch(err => res.status(500).json({ err }));
};
const readAllRestaurant = (req: Request, res: Response, next: NextFunction) => {
    return Restaurant.find()
        .then((restaurant) => res.status(200).json({ restaurant }))
        .catch(err => res.status(500).json({ err }));
};
const updateRestaurant = (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.userId;
    return Restaurant.findById(restaurantId)
        .then(restaurant => {
            if (restaurant) {
                restaurant.set(req.body)
                return restaurant.save()
                    .then(restaurant => res.status(201).json({ restaurant }))
                    .catch(err => res.status(500).json({ err }));
            }
            else {
                res.status(404).json({ message: 'restaurant not found' });
            }
        })
        .catch(err => res.status(500).json({ err }));
};
const deleteRestaurant = (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.id;
    return Restaurant.findByIdAndDelete(restaurantId).then(restaurant => restaurant ? res.status(201).json({ message: 'restaurant deleted succesfuly' })
        : res.status(404).json({ message: 'restaurant not found' })).catch(err => res.status(500).json({ err }));
};

export default { createRestaurant, readAllRestaurant, readRestaurant, updateRestaurant, deleteRestaurant }
