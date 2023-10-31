"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Restaurant_1 = __importDefault(require("../controllers/Restaurant"));
const router = express_1.default.Router();
router.post('/create', Restaurant_1.default.createRestaurant);
router.get('/get:restaurantId', Restaurant_1.default.readRestaurant);
router.get('/get', Restaurant_1.default.readAllRestaurant);
router.patch('update/:restaurantId', Restaurant_1.default.updateRestaurant);
router.delete('delete/:restaurantId', Restaurant_1.default.deleteRestaurant);
module.exports = router;
