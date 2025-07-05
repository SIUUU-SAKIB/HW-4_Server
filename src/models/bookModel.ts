import { model, Schema } from "mongoose";
import { IBook } from "../types/bookInterface";

const bookSchema = model("books", new Schema<IBook>({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
        type: String, enum: [
            "DRAMA", "HISTORY", "FICTION", "SCIENCE", "NON-FICTION", "ADVENTURE"
        ]
    },
    isbn: { type: Number, required: true, unique: true },
    description: { type: String, required: true },
    copies: { min: 0, required: true, type: Number },
    available: { type: Boolean, default: true },

}, { timestamps: true, versionKey: false }))

export default bookSchema;