import { number } from "joi";
import mongoose, { Document, Schema } from "mongoose";

export interface IMenu {
    item_name: string;
    price: number;
}

export interface IMenuModel extends IMenu, Document { }

const MenuSchema: Schema = new Schema(
    {
        item_name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        restaurant_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Restaurant',
            required: true,
        },

    },
    {
        versionKey: false
    }
);

export default mongoose.model<IMenuModel>('Menu', MenuSchema);
