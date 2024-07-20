"use server"

import { cookies } from "next/headers";
import { connectToDatabase } from "../database";
import Pharmacy from "../database/models/pharmacy.model";
import { getUserId } from "./customer.actions";
import Pharmacist from "../database/models/pharmacist.model";
import { revalidatePath } from "next/cache";
import Customer from "../database/models/customer.model";

type createPharmacyParams = {
    pharmacist: string;
    name: string;
    description: string;
    location: string;
    email: string;
    working_hours: string;
    address: string;
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

export const clearPharmacyId = async () => {
    await cookies().delete("pharmacyId")
}

export const createPharmacy = async (data: createPharmacyParams) => {
    try {
        await connectToDatabase()
        const createdPharmacy = await Pharmacy.create(data)
        if (!createdPharmacy) {
          return JSON.stringify({ msg: "could not create pharmacy"})
        }

        return JSON.stringify({ msg: "pharmacy created", pharmacy: createdPharmacy})
    } catch (error) {
        return JSON.stringify({
            msg: "unexpected error occurred",
            error,
        })
    }
}

export const getPharmacy = async (userId: string) => {
    try {
        await connectToDatabase()

        const pharmacist = await Pharmacist.findOne({ user: userId })
        const pharmacy = await Pharmacy.findOne({ pharmacist: pharmacist._id })
        
        if(!pharmacy) {
            return JSON.stringify({ msg: "could not fetch pharmacy"})
        }
        return JSON.stringify({ msg: "fetched pharamcy", pharmacy, })
    } catch (error) {
        return JSON.stringify({
            msg: "error fetching pharmacy",
            error
        })
        throw error
    }
}

export const updatePharmacy = async (values: UpdatePharmacyParams, id: string, path: string) => {
    try {
        await connectToDatabase()
        const updatedPharmacy = await Pharmacy.findByIdAndUpdate(id, values, { new: true })
        if (!updatedPharmacy) {
            return JSON.stringify({ msg: "could not update pharmacy"})
        }
        revalidatePath(path)
        return JSON.stringify({ msg: "updated pharmacy", updatedPharmacy })

    } catch (error) {
        return JSON.stringify({
            msg: "error updating pharmacy",
            error
        })
    }
}

export const getPharmaciesBasedOnUserLocation = async (userId: string) => {

    try {

        await connectToDatabase()
        const customer = await Customer.findOne({ user: userId })
        const pharmacies = await Pharmacy.find({ location: customer.location })
        if(!pharmacies) {
            return JSON.stringify({ msg: "no pharmacies"})
        }
        return JSON.stringify({ msg: "OK", pharmacies, })
    } catch (error) {
        return JSON.stringify({
            msg: "error fetching pharmacies",
            error
        })
    }
}

export const getOtherPharmacies = async (location: string) => {
    try {
        await connectToDatabase()

        // handling null / undefined cases 
        const query = location ? { location: { $ne: location }} : {}
        const pharmacies = await Pharmacy.find(query)
        if (!pharmacies) {
            return JSON.stringify({ msg: "could not find any pharmacy"})
        }
        return JSON.stringify({ msg: "fetched pharmacies", pharmacies })
    } catch (error) {
        return JSON.stringify({
            msg: "error fetching pharmacies",
            error
        })
    }
}


export const getPharmacyBasedOnPharmacyId = async (pharmacyId: string) => {
    try {
        await connectToDatabase()
        const pharmacy = await Pharmacy.findById(pharmacyId)
        if (!pharmacy) {
            return JSON.stringify({
                msg: "could not find pharmacy"
            })
        }
        return JSON.stringify({ msg: "OK", pharmacy })
    } catch (error) {
        return JSON.stringify({
            msg: "could not fetch pharmacy",
            error
        })
    }
}