import { ISchedule } from "../models/Restaurant";

export function scheduleValidator(value: ISchedule[]): boolean {
    console.log(value);
    return value.length === 7;
}