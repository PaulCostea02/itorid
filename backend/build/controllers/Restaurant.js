"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const createRestaurant = (req, res, next) => {
    const { name, address, schedule } = req.body;
    const restaurant = new Restaurant_1.default({
        _id: new mongoose_1.default.Types.ObjectId,
        name,
        address,
        schedule: schedule,
    });
    return restaurant.save()
        .then(restaurant => res.status(201).json({ restaurant }))
        .catch(err => res.status(500).json({ err }));
};
const readRestaurant = (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    return Restaurant_1.default.findById(restaurantId)
        .then(restaurant => restaurant ? res.status(201).json({ restaurant }) : res.status(404).json({ message: 'restaurant not found' }))
        .catch(err => res.status(500).json({ err }));
};
const readAllRestaurant = (req, res, next) => {
    return Restaurant_1.default.find()
        .then((restaurant) => res.status(200).json({ restaurant }))
        .catch(err => res.status(500).json({ err }));
};
const updateRestaurant = (req, res, next) => {
    const restaurantId = req.params.userId;
    return Restaurant_1.default.findById(restaurantId)
        .then(restaurant => {
        if (restaurant) {
            restaurant.set(req.body);
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
const deleteRestaurant = (req, res, next) => {
    const restaurantId = req.params.id;
    return Restaurant_1.default.findByIdAndDelete(restaurantId).then(restaurant => restaurant ? res.status(201).json({ message: 'restaurant deleted succesfuly' })
        : res.status(404).json({ message: 'restaurant not found' })).catch(err => res.status(500).json({ err }));
};
exports.default = { createRestaurant, readAllRestaurant, readRestaurant, updateRestaurant, deleteRestaurant };
