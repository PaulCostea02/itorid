import bcrypt from "bcrypt";
import { IUserModel } from "../models/User";

export const userPreSaveMiddleware = async function (this: IUserModel, next: () => void) {
    if (this.isModified("password")) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        } catch (err: any) {
            return err;
        }
    }
    next();
};
