import { model, Schema } from "mongoose";
import { IBook } from "../types/bookInterface";

const bookSchema = model("books", new Schema<IBook>({
    image: { type: String },
    published: { type: Number, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
        type: String,
        enum: ["Drama", "History", "Fiction", "Science", "Non-Fiction", "Adventure", "Biography", "Others"],
        required: true
    },
    isbn: { type: Number, required: true, unique: true },
    description: { type: String, required: true },
    copies: { min: 0, required: true, type: Number },
    available: { type: Boolean, default: true },

}, { timestamps: true, versionKey: false }))

export default bookSchema;