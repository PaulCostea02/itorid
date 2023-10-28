import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const user = new User({
        _id: new mongoose.Types.ObjectId,
        name,
        email,
        password
    })
    return user.save()
        .then(user => res.status(201).json({ user }))
        .catch(err => res.status(500).json({ err }));
};
const readUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then(user => user ? res.status(201).json({ user }) : res.status(404).json({ message: 'user not found' }))
        .catch(err => res.status(500).json({ err }));
};
const readAllUser = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then((users) => res.status(200).json({ users }))
        .catch(err => res.status(500).json({ err }));
};
const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    return User.findById(userId)
        .then(user => {
            if (user) {
                user.set(req.body)
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
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    return User.findByIdAndDelete(userId).then(user => user ? res.status(201).json({ message: 'user deleted succesfuly' })
        : res.status(404).json({ message: 'user not found' })).catch(err => res.status(500).json({ err }));
};

export default { createUser, readAllUser, readUser, updateUser, deleteUser }