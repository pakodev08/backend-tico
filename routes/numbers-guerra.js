import { Router } from "express";
import { guerraNumbersGenerate } from "../controllers/numbers-guerra.js";
const numbersGuerra = Router();

numbersGuerra.get(`/`, guerraNumbersGenerate)

export {
    numbersGuerra
}