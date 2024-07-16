"use server"

import { connectToDatabase } from "../database";
import Drug from "../database/models/drugs.model";
// import Pharmacy from "../database/models/pharmacy.model";
import { revalidatePath } from "next/cache";
import Pharmacy from "../database/models/pharmacy.model";

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

type SearchDrugsWithTextParams = {
    data: string[]
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

export const getDrugsBasedOnPharmacyId = async (pharmacistId: string) => {
    try {
        await connectToDatabase()

        const pharmacy = await Pharmacy.findOne({ pharmacist: pharmacistId })
        const drugs = await Drug.find({ pharmacy: pharmacy._id })
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


export const searchDrugsWithText = async (data: SearchDrugsWithTextParams) => {
    try {
        await connectToDatabase()

        const drugs = await Drug.find({ name: { $in: data }})

        if (!drugs) {
            return JSON.stringify({ error: "drugs not found"})
        }

        return JSON.stringify({
            msg: "drugs found",
            drugs,
        })
    } catch (error) {
        return JSON.stringify({
            msg: "error fetching drugs from pharmacy",
            error
        })
    }
}


export const getDrugBasedOnID = async (id: string) => {
    try {
        await connectToDatabase()

        const drug = await Drug.findById(id)
        if (!drug) {
            return JSON.stringify({ msg: "no drug found" })
        }

        return JSON.stringify({ msg: "drug found", drug })
    } catch (error) {
        return JSON.stringify({
            msg: "error fetching drug",
            error
        })
    }
}