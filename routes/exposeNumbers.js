import { Router } from "express";
import { exposeNumbers } from "../controllers/exposeNumbers.js";


const exposeNumbersRouter = Router();

exposeNumbersRouter.get('/', exposeNumbers)



export {
    exposeNumbersRouter
}
