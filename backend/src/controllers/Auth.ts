import { NextFunction, Request, Response } from "express";
import User, { IUserModel } from "../models/User";
import controller from "./User";
import jwt from "jsonwebtoken";

const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!(email && password && name))
            return res.status(400).json({ message: "All input is required" });
        const checkIfUserExists = await User.findOne({ email });
        if (checkIfUserExists)
            return res.status(409).json({ message: "User already exists" });
        const user = await controller.createUser(req, res) as IUserModel;
        if (user) {
            const token = jwt.sign({ email, user_id: user._id }, "my_secret_key", {
                expiresIn: "1h"
            });
            res.status(201).json({ user, token });
        }
        else
            res.status(500).json({ message: "User creation failed" })

    } catch (err) {
        res.status(500).json({ err });
    }
}
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
export default { registerUser };