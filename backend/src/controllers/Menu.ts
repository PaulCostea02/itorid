import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Menu from "../models/Menu";

const createMenu = (req: Request, res: Response, next: NextFunction) => {
    const { item_name, price, restaurant_id } = req.body;

    const menu = new Menu({
        _id: new mongoose.Types.ObjectId,
        item_name,
        price,
        restaurant_id,
    });

    return menu.save()
        .then((menu) => res.status(201).json({ menu }))
        .catch((err) => res.status(500).json({ err }));
};

const readMenu = (req: Request, res: Response, next: NextFunction) => {
    const menuId = req.params.menuId;

    return Menu.findById(menuId)
        .then((menu) => menu ? res.status(200).json({ menu }) : res.status(404).json({ message: 'menu not found' }))
        .catch((err) => res.status(500).json({ err }));
};


const readAllMenus = (req: Request, res: Response, next: NextFunction) => {
    return Menu.find()
        .then((menus) => res.status(200).json({ menus }))
        .catch((err) => res.status(500).json({ err }));
};

const updateMenu = (req: Request, res: Response, next: NextFunction) => {
    const menuId = req.params.menuId;

    return Menu.findById(menuId)
        .then((menu) => {
            if (menu) {
                menu.set(req.body);
                return menu.save()
                    .then((menu) => res.status(200).json({ menu }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                res.status(404).json({ message: 'menu not found' });
            }
        })
        .catch((err) => res.status(500).json({ err }));
};

const deleteMenu = (req: Request, res: Response, next: NextFunction) => {
    const menuId = req.params.menuId;

    return Menu.findByIdAndDelete(menuId)
        .then((menu) => menu ? res.status(200).json({ message: 'menu deleted successfully' }) : res.status(404).json({ message: 'menu not found' }))
        .catch((err) => res.status(500).json({ err }));
};

export default { createMenu, readAllMenus, readMenu, updateMenu, deleteMenu };
