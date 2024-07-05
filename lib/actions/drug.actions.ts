"use server"

import { connectToDatabase } from "../database";
import Drug from "../database/models/drugs.model";

type CreateDrugParams = {
    image: string;
    pharmacy: string | undefined;
    name: string;
    description: string;
    category: string;
    price: string;
    stock_quantity: string;
    require_prescription: boolean;
    expiry_date: string;
}

export const createDrug = async (data: CreateDrugParams) => {
    try {
        await connectToDatabase()
        const newDrug = await Drug.create(data)
        if (!newDrug) {
            return JSON.stringify({ error: "could not create drug"})
        }
        return JSON.stringify({ msg: "OK", drug: newDrug })
    } catch (error) {
        throw error
    }
}