import mongoose from "mongoose";

 const borrowSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    borrowerName: {type:String},
    dueDate: Date,
    borrowDate: {
        type: Date,
        default: Date.now
    }, isbn:{type:Number}
}) 
const BorrowModel = mongoose.model("Borrow", borrowSchema);

export default BorrowModel;