"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerController = void 0;
const express_1 = __importDefault(require("express"));
const bookModel_1 = __importDefault(require("../models/bookModel"));
const borrowModel_1 = __importDefault(require("../models/borrowModel"));
exports.routerController = express_1.default.Router();
// *DEFAULT ROUTE
exports.routerController.get(`/`, (req, res) => {
    res.send(`HELLO ASSINGMENT-4`);
});
// *GET ALL BOOKS
exports.routerController.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield bookModel_1.default.find();
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// *GET BOOK BY IDENTIFICATION
exports.routerController.get(`/books/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const bookById = yield bookModel_1.default.findById(id);
        bookById ? res.status(200).json({ status: true, message: "Successfully fetched the book", book: bookById }) : res.status(404).json({ status: false, message: "Failed to fetch the book😔" });
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Something went wrong," + error });
    }
}));
// *POST BOOKS
exports.routerController.post(`/create-book`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield bookModel_1.default.create(req.body);
        res.status(200).json({
            status: true,
            data: books,
            messge: "Books added successfully"
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// *UPDATE BOOK
exports.routerController.patch("/edit-book/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    console.log(id, updates);
    try {
        const updateBook = yield bookModel_1.default.findByIdAndUpdate(id, updates, {
            new: true
        });
        // 01711299054
        !updateBook ? res.status(404).json({ status: false, message: "Book Not Found" }) : res.status(200).json({ status: true, message: "Successfully updated the book", updateBook });
    }
    catch (error) {
        res.status(500).json({ message: `Error while updating the book, ${error}` });
    }
}));
// *DELETE THE BOOK
exports.routerController.delete('/delete-book/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedBook = yield bookModel_1.default.findByIdAndDelete(id);
        if (!deletedBook) {
            res.status(404).json({ status: false, message: "Book not found" });
        }
        else {
            res.status(200).json({ status: true, message: "Successfully deleted the book" });
        }
    }
    catch (error) {
        res.status(500).json({ message: `Failed to delete the book, ${error}` });
    }
}));
// *BORROW OPERATIONS = POST
exports.routerController.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, quantity, dueDate, borrowerName } = req.body;
    try {
        const book = yield bookModel_1.default.findById(bookId);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
        }
        if (book.copies < quantity) {
            res.status(400).json({ message: "Not enough copies available" });
        }
        const borrow = yield borrowModel_1.default.create({
            book: bookId,
            quantity,
            dueDate,
            borrowerName
        });
        book.copies -= quantity;
        yield book.save();
        res.status(201).json({ message: "Book borrowed successfully", borrow });
    }
    catch (error) {
        res.status(500).json({ message: "Error borrowing book", error: error.message });
    }
}));
exports.routerController.get(`/borrowed-books`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowedBooks = yield borrowModel_1.default.find();
        res.status(200).json({ message: "Successfully got the borrowed books", borrowedBooks });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get the borrowed books", error });
    }
}));
exports.routerController.get(`/borrow-book/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const borrowedBooks = yield bookModel_1.default.findById(id);
        res.status(200).json({ message: "Successfully got the borrowed books", borrowedBooks });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get the book", error });
    }
}));
exports.routerController.get("/borrow-summary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrowModel_1.default.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalBorrowed: { $sum: '$quantity' },
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookDetails'
                }
            },
            {
                $unwind: '$bookDetails'
            },
            {
                $project: {
                    _id: 0,
                    bookId: '$bookDetails._id',
                    title: '$bookDetails.title',
                    author: '$bookDetails.author',
                    isbn: '$bookDetails.isbn',
                    totalBorrowed: 1
                }
            }
        ]);
        res.status(200).json(summary);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to get summary', error: err.message });
    }
}));
