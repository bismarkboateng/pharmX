"use server"

import { connectToDatabase } from "../database";
import Drug from "../database/models/drugs.model";
import { revalidatePath } from "next/cache";

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

export const createDrug = async (data: CreateDrugParams, pathname: string) => {
    try {
        await connectToDatabase()
        const newDrug = await Drug.create(data)
        if (!newDrug) {
            return JSON.stringify({ msg: "could not create drug"})
        }
        revalidatePath(pathname)
        return JSON.stringify({ msg: "OK", drug: newDrug })
    } catch (error) {
        throw error
    }
}

export const getDrugs = async () => {
    try {
        await connectToDatabase()
        const drugs = await Drug.find({})
        if (!drugs) {
            return JSON.stringify({ error: "drugs not found"})
        }
        return JSON.stringify({
            msg: "drugs found",
            drugs,
        })
    } catch (error) {
        return JSON.stringify({
            msg: "error fetching drugs",
            error
        })
    }
}