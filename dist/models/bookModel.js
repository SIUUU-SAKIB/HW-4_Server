"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = (0, mongoose_1.model)("books", new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
        type: String, enum: [
            "DRAMA", "HISTORY", "FICTION", "SCIENCE", "NON-FICTION", "ADVENTURE"
        ]
    },
    isbn: { type: Number, required: true, unique: true }
}));
