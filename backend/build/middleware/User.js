"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPreSaveMiddleware = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userPreSaveMiddleware = async function (next) {
    if (this.isModified("password")) {
        try {
            const hashedPassword = await bcrypt_1.default.hash(this.password, 10);
            this.password = hashedPassword;
        }
        catch (err) {
            return err;
        }
    }
    next();
};
exports.userPreSaveMiddleware = userPreSaveMiddleware;
