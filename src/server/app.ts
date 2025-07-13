import express, { Request, Response, Application } from "express";
import { routerController } from "../controllers/book.controller";
const app: Application = express()
const cors = require("cors")
app.use(express.json())
app.use(cors(
    {
        origin:"https://extraordinary-croquembouche-6c3c62.netlify.app/",
         methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
))

app.use('/', routerController)

export default app;