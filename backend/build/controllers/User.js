"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const createUser = (req, res, next) => {
    const { name, email, password } = req.body;
    const user = new User_1.default({
        name,
        email,
        password
    });
    return user.save()
        .then((savedUser) => {
        return savedUser;
    })
        .catch((err) => res.status(500).json({ err }));
};
const readUser = (req, res, next) => {
    const userId = req.params.userId;
    return User_1.default.findById(userId)
        .then(user => user ? res.status(201).json({ user }) : res.status(404).json({ message: 'user not found' }))
        .catch(err => res.status(500).json({ err }));
};
const readAllUser = (req, res, next) => {
    return User_1.default.find()
        .then((users) => res.status(200).json({ users }))
        .catch(err => res.status(500).json({ err }));
};
const updateUser = (req, res, next) => {
    const userId = req.params.userId;
    return User_1.default.findById(userId)
        .then(user => {
        if (user) {
            user.set(req.body);
            return user.save()
                .then(user => res.status(201).json({ user }))
                .catch(err => res.status(500).json({ err }));
        }
        else {
            res.status(404).json({ message: 'user not found' });
        }
    })
        .catch(err => res.status(500).json({ err }));
};
const deleteUser = (req, res, next) => {
    const userId = req.params.id;
    return User_1.default.findByIdAndDelete(userId).then(user => user ? res.status(201).json({ message: 'user deleted succesfuly' })
        : res.status(404).json({ message: 'user not found' })).catch(err => res.status(500).json({ err }));
};
exports.default = { createUser, readAllUser, readUser, updateUser, deleteUser };
