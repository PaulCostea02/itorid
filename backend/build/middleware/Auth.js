"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-acces-token"];
    if (!token) {
        res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "my_secret_key");
        req.user = decoded;
    }
    catch (err) {
        return res.status(401).send("Invalid token");
    }
    return next();
};
exports.default = verifyToken;
