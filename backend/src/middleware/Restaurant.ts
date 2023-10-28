import { ISchedule } from "../models/Restaurant";

export function scheduleValidator(value: ISchedule[]): boolean {
    return value.length === 7;
}