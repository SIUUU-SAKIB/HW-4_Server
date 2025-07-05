import { Types } from "mongoose";

export interface IBorrow {
    bookId: Types.ObjectId,
    quantity: number,
    borrowName: string,
    borrowdate?: Date,
    dueDate: Date

}