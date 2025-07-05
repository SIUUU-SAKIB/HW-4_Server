"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const borrowSchema = new mongoose_1.default.Schema({
    book: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "books",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    borrowerName: { type: String },
    dueDate: Date,
    borrowDate: {
        type: Date,
        default: Date.now
    }
});
const BorrowModel = mongoose_1.default.model("Borrow", borrowSchema);
exports.default = BorrowModel;
