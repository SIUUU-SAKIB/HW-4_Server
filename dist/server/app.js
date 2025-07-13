"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const app = (0, express_1.default)();
const cors = require("cors");
app.use(express_1.default.json());
app.use(cors({
    origin: "https://extraordinary-croquembouche-6c3c62.netlify.app/",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use('/', book_controller_1.routerController);
exports.default = app;
