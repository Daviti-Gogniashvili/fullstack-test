import { Router } from "express";

export const companyRouter = Router();

companyRouter.get("/", (req, res, next) => {
    res.send("hello there");
})
companyRouter.post("/", (req, res, next) => {
    res.send("hello there");
})
companyRouter.put("/", (req, res, next) => {
    res.send("hello there");
})