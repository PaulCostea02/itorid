import mongoose, { Document, Schema } from "mongoose";

enum OrderStatus {
    PREPARING = 'preparing',
    LF_COURIER = 'looking for courier',
    ON_YOUR_WAY = 'on your way',
    FINISHED = 'finished'
}

export interface IOrder {
    order_status: OrderStatus,
    order_total: number,
}

export interface IOrderModel extends IOrder, Document { }

const OrderSchema: Schema = new Schema(
    {
        order_status: {
            type: String,
            enum: Object.values(OrderStatus),
            required: true,
        },
        order_total: {
            type: Number,
            required: true,
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        restaurant_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Restaurant',
            required: true,
        }

    },
    {
        versionKey: false
    }
);

export default mongoose.model<IOrderModel>('Order', OrderSchema);
