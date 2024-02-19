import { Router } from "express";
import { Company } from "./company.entity.js";
import { v4 as uuidv4 } from "uuid";

export const companyRouter = Router();

companyRouter.get("/", (req, res, next) => {
    Company.findOne((req.params as any).pr_id).exec().then(doc => (res.status(200).json({ id: doc.id, title: doc.title })))
})
companyRouter.post("/", (req, res, next) => {
    console.log(req.body)
    const company = new Company({
        id: uuidv4(),
        title: req.body.title
    });
    company.save().then((res) => {
        console.log(res);
    }).catch((error) => {
        console.error(error);
    })
    res.status(201).json({
        message: "added info in Company",
        company
    })
})