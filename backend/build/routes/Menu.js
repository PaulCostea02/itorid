"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Menu_1 = __importDefault(require("../controllers/Menu"));
const router = express_1.default.Router();
router.post('/create', Menu_1.default.createMenu);
router.get('/get:menuId', Menu_1.default.readMenu);
router.get('/get', Menu_1.default.readAllMenus);
router.patch('update/:menuId', Menu_1.default.updateMenu);
router.delete('delete/:menuId', Menu_1.default.deleteMenu);
module.exports = router;
