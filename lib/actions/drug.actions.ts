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

export const addDrug = async (data: CreateDrugParams, pathname: string, pharmacyId: string) => {
    try {
        await connectToDatabase()
        const newDrug = await Drug.create(data)
        await Pharmacy.findByIdAndUpdate(
            pharmacyId,
            { $push: { drugs: newDrug._id }}
        )
        if (!newDrug) {
            return JSON.stringify({ msg: "could not create drug"})
        }
        revalidatePath(pathname)
        return JSON.stringify({ msg: "OK", drug: newDrug })
    } catch (error) {
        throw error
    }
}

export const getDrugsBasedOnPharmacyId = async (pharmacyId: string) => {
    try {
        await connectToDatabase()
        
        const drugs = await Drug.find({ pharmacy: pharmacyId })
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


export const searchDrugsWithText = async (tokens: any) => {
    try {
        await connectToDatabase()

        const regexTokens = tokens.map((token: any) => ({ name: { $regex: new RegExp(token, 'i') }}));

        const query = { $or: regexTokens };
        const drugs = await Drug.find(query);

        if (!drugs || drugs.length === 0) {
            return JSON.stringify({ error: "drugs not found" });
        }

        return JSON.stringify({
            msg: "drugs found",
            drugs,
        })
    } catch (error) {
        return JSON.stringify({
            msg: "error fetching drugs from pharmacy",
            error,
            drugs: []
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

export const getDrugsBasedOnMultipleIds = async  (drugIds: string[]) => {
    try {
        await connectToDatabase()
        const drugs = await Drug.find({ _id: { $in: drugIds}})
        return JSON.stringify({
            msg: "OK",
            drugs
        })
    } catch (error) {
        return JSON.stringify({
            msg: "error fetching drug",
            error
        })
    }
}