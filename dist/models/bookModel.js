"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = (0, mongoose_1.model)("books", new mongoose_1.Schema({
    image: { type: String },
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
}, { timestamps: true, versionKey: false }));
exports.default = bookSchema;
