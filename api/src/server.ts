import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from '@adminjs/mongoose';
import AdminJS, { AdminJSOptions } from 'adminjs';
import dotenv from "dotenv";
import express from 'express';
import { connect } from 'mongoose';
import { companyRouter } from './company/company.router.js';
import { Company, CompanyResource } from "./company/company.entity.js";
import bodyParser from "body-parser"
dotenv.config();

const PORT = process.env.PORT || 3000;

const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
}

const authenticate = async (email: string, password: string) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
}

AdminJS.registerAdapter({
    Resource: Resource,
    Database: Database,
})

export const start = async () => {
    const app = express()
    await connect(process.env.DATABASE_URL!)

    const adminOptions: AdminJSOptions = {
        resources: [CompanyResource],
    }
    const admin = new AdminJS(adminOptions)

    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: 'sessionsecret',
        },
        null,
        {
            resave: true,
            saveUninitialized: true,
            secret: 'sessionsecret',
            name: 'adminjs',
        }
    )
    app.use('/test-endpoint', bodyParser.json(), companyRouter)
    app.use(express.static('../ui/build'))
    app.use(admin.options.rootPath, adminRouter)

    app.listen(PORT, () => {
        console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    })
}