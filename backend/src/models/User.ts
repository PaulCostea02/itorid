import mongoose, { Document, Schema } from "mongoose";
import { userPreSaveMiddleware } from "../middleware/User";

export interface IUser {
    name: string,
    email: string,
    password: string
}
export interface IUserModel extends IUser, Document { }

const UserSchema: Schema = new Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
        },
        name: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false
    }
);
UserSchema.pre<IUserModel>("save", userPreSaveMiddleware)
export default mongoose.model<IUserModel>('User', UserSchema);