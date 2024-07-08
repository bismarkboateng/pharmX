"use server"

import { cookies } from "next/headers";
import { connectToDatabase } from "../database";
import Pharmacy from "../database/models/pharmacy.model";
import { getUserId } from "./customer.actions";

type createPharmacyParams = {
    name: string;
    description: string;
    location: string;
    address: string;
    email: string;
    working_hours: string;
}

type UpdatePharmacyParams = {
    name: string;
    location: string;
    address: string;
    email: string;
}

export const setPharmacyId = async (id: string) => {
    await cookies().set("pharmacyId", id)
}

export const getPharmacyId = async () => {
    const cookie = await cookies().get("pharmacyId")
    if (cookie) return cookie.value
}

export const createPharmacy = async (data: createPharmacyParams) => {
    try {
        await connectToDatabase()

        const pharmacistId = await getUserId()

        const createdPharmacy = await Pharmacy.create({
            ...data,
            pharmacist: pharmacistId
        })
        if (!createdPharmacy) {
          return JSON.stringify({ msg: "could not create pharmacy"})
        }

        return JSON.stringify({ msg: "pharmacy created", pharmacy: createdPharmacy})
    } catch (error) {
        return JSON.stringify({
            msg: "error encountered while creating pharmacy",
            error,
        })
    }
}

export const getPharmacy = async (id: string) => {
    try {
        await connectToDatabase()
        const pharmacy = await Pharmacy.findById(id)
        if(!pharmacy) {
            return JSON.stringify({ msg: "could not fetch pharmacy"})
        }
        return JSON.stringify({ msg: "fetched pharamcy", pharmacy, })
    } catch (error) {
        return JSON.stringify({
            msg: "error fetching pharmacy",
            error
        })
    }
}

export const updatePharmacy = async (values: UpdatePharmacyParams, id: string) => {
    try {
        await connectToDatabase()
        const updatedPharmacy = await Pharmacy.findByIdAndUpdate(id, values, { new: true })
        if (!updatedPharmacy) {
            return JSON.stringify({ msg: "could not update pharmacy"})
        }
        return JSON.stringify({ msg: "updated pharmacy", updatedPharmacy })
    } catch (error) {
        return JSON.stringify({
            msg: "error updating pharmacy",
            error
        })
    }
}