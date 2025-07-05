import express, { Request, Response } from "express";
import bookSchema from "../models/bookModel";
import BorrowModel from "../models/borrowModel";
export const routerController = express.Router()

// *DEFAULT ROUTE
routerController.get(`/`, (req, res) => {
    res.send(`HELLO ASSINGMENT-4`)
})

// *GET ALL BOOKS
routerController.get('/books', async (req: Request, res: Response) => {
    try {
        const books = await bookSchema.find()
        res.status(200).json(books)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})
// *GET BOOK BY IDENTIFICATION
routerController.get(`/books/:id`, async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const bookById = await bookSchema.findById(id)
        bookById ? res.status(200).json({ status: true, message: "Successfully fetched the book", book: bookById }) : res.status(404).json({ status: false, message: "Failed to fetch the book😔" })
    } catch (error: any) {
        res.status(500).json({ status: false, message: "Something went wrong," + error })
    }
})
// *POST BOOKS

routerController.post(`/create-book`, async (req: Request, res: Response) => {
    try {
        const books = await bookSchema.create(req.body)
        res.status(200).json({
            status: true,
            data: books,
            messge: "Books added successfully"
        })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

// *UPDATE BOOK

routerController.patch("/edit-book/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    console.log(id, updates)
    try {
        const updateBook = await bookSchema.findByIdAndUpdate(id, updates, {
            new: true
        })

        !updateBook ? res.status(404).json({ status: false, message: "Book Not Found" }) : res.status(200).json({ status: true, message: "Successfully updated the book", updateBook })

    } catch (error: any) {
        res.status(500).json({ message: `Error while updating the book, ${error}` })
    }
})

// *DELETE THE BOOK

routerController.delete('/delete-book/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedBook = await bookSchema.findByIdAndDelete(id)

        !deletedBook ? res.status(404).json({ status: false, message: "Book not found" }) : res.status(200).json({ status: true, message: "Successfully deleted the book" })
    } catch (error: any) {
        res.status(500).json({ message: `Failed to delete the book, ${error}` })
    }
})

// *BORROW OPERATIONS = POST
routerController.post("/borrow", async (req: Request, res: Response) => {

    const { bookId, quantity, dueDate, borrowerName } = req.body;
    try {

        const book: any = await bookSchema.findById(bookId)

        if (!book) {
            res.status(404).json({ message: "Book not found" });
        }

        if (book.copies < quantity) {
            res.status(400).json({ message: "Not enough copies available" });
        }

        const borrow = await BorrowModel.create({
            book: bookId,
            quantity,
            dueDate,
            borrowerName
        })
        book.copies -= quantity
        await book.save()

        res.status(201).json({ message: "Book borrowed successfully", borrow })

    } catch (error: any) {
        res.status(500).json({ message: "Error borrowing book", error: error.message })
    }
})

