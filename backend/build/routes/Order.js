"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Order_1 = __importDefault(require("../controllers/Order"));
const router = express_1.default.Router();
router.post('/create', Order_1.default.createOrder);
router.get('/get:orderId', Order_1.default.readOrder);
router.get('/get', Order_1.default.readAllOrders);
router.patch('update/:orderId', Order_1.default.updateOrder);
router.delete('delete/:orderId', Order_1.default.deleteOrder);
module.exports = router;
