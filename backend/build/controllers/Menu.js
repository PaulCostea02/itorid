"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Menu_1 = __importDefault(require("../models/Menu"));
const createMenu = (req, res, next) => {
    const { item_name, price, restaurant_id } = req.body;
    const menu = new Menu_1.default({
        _id: new mongoose_1.default.Types.ObjectId,
        item_name,
        price,
        restaurant_id,
    });
    return menu.save()
        .then((menu) => res.status(201).json({ menu }))
        .catch((err) => res.status(500).json({ err }));
};
const readMenu = (req, res, next) => {
    const menuId = req.params.menuId;
    return Menu_1.default.findById(menuId)
        .then((menu) => menu ? res.status(200).json({ menu }) : res.status(404).json({ message: 'menu not found' }))
        .catch((err) => res.status(500).json({ err }));
};
const readAllMenus = (req, res, next) => {
    return Menu_1.default.find()
        .then((menus) => res.status(200).json({ menus }))
        .catch((err) => res.status(500).json({ err }));
};
const updateMenu = (req, res, next) => {
    const menuId = req.params.menuId;
    return Menu_1.default.findById(menuId)
        .then((menu) => {
        if (menu) {
            menu.set(req.body);
            return menu.save()
                .then((menu) => res.status(200).json({ menu }))
                .catch((err) => res.status(500).json({ err }));
        }
        else {
            res.status(404).json({ message: 'menu not found' });
        }
    })
        .catch((err) => res.status(500).json({ err }));
};
const deleteMenu = (req, res, next) => {
    const menuId = req.params.menuId;
    return Menu_1.default.findByIdAndDelete(menuId)
        .then((menu) => menu ? res.status(200).json({ message: 'menu deleted successfully' }) : res.status(404).json({ message: 'menu not found' }))
        .catch((err) => res.status(500).json({ err }));
};
exports.default = { createMenu, readAllMenus, readMenu, updateMenu, deleteMenu };
