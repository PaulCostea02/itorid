import mongoose, { Document, Schema } from 'mongoose';
import { scheduleValidator } from '../middleware/Restaurant';

export interface ISchedule {
    day: string,
    opening: string | null,
    closing: string | null,
}

export interface IRestaurant {
    name: string;
    address: string;
}

export interface IRestaurantModel extends IRestaurant, Document { }

const RestaurantSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            type: String,
            required: true,
            unique: true
        },
        schedule: [
            {
                day: {
                    type: String,
                    required: true
                },
                opening: {
                    type: String,
                    required: false
                },
                closing: {
                    type: String,
                    required: false
                }
            }
        ]
    },
    {
        versionKey: false
    }
);
RestaurantSchema.path('schedule').validate(scheduleValidator, 'A week has 7 days');
export default mongoose.model<IRestaurantModel>('Restaurant', RestaurantSchema);
