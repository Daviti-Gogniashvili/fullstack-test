import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from "uuid";

export interface ICompany {
    id: String;
    title: string;
}

const date = new Date();

export const CompanySchema = new Schema<ICompany>(
    {
        id: { type: 'String', required: true, default: uuidv4() },
        title: { type: 'String', required: true },

    }, { timestamps: true, autoCreate: true },
)

export const Company = model<ICompany>('Company', CompanySchema);