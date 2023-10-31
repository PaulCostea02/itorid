"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("../controllers/Auth"));
const router = express_1.default.Router();
//router.post('/login', controller.loginUser);
router.post('/signUp', Auth_1.default.registerUser);
module.exports = router;
