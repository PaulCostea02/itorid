"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const User_2 = __importDefault(require("./User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!(email && password && name))
            return res.status(400).json({ message: "All input is required" });
        const checkIfUserExists = await User_1.default.findOne({ email });
        if (checkIfUserExists)
            return res.status(409).json({ message: "User already exists" });
        const user = await User_2.default.createUser(req, res);
        if (user) {
            const token = jsonwebtoken_1.default.sign({ email, user_id: user._id }, "my_secret_key", {
                expiresIn: "1h"
            });
            res.status(201).json({ user, token });
        }
        else
            res.status(500).json({ message: "User creation failed" });
    }
    catch (err) {
        res.status(500).json({ err });
    }
};
// const loginUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { email, password } = req.body;
//         if (!(email && password)) res.status(400).send("All input is required");
//         const user = await User.findOne({ email });
//         if (user && (await bcrypt.compare(password, user.password))) {
//             const token = jwt.sign({ email, user_id: user._id }, "my_secret_key", {
//                 expiresIn: "1h"
//             });
//             res.status(201).json({ user, token });
//         }
//         else
//             res.status(500).json({ message: "Invalid Credentials" })
//     } catch (err) {
//         res.status(500).json({ err });
//     }
// }
exports.default = { registerUser };
