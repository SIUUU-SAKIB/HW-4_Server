import express, { Request, Response, Application } from "express";
import { routerController } from "../controllers/book.controller";
const app: Application = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())

app.use('/', routerController)

export default app;