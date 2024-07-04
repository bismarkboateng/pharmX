"use server"

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

export const createPharmacy = async (data: createPharmacyParams) => {
    try {
        await connectToDatabase()

        const pharmacistId = await getUserId()

        const createdPharmacy = await Pharmacy.create({
            ...data,
            pharmacist: pharmacistId
        })
        if (!createdPharmacy) {
          return JSON.stringify({ error: "could not create pharmacy"})
        }

        return JSON.stringify({ msg: "pharmacy created", pharmacy: createdPharmacy})
    } catch (error) {
        return JSON.stringify({ error: "error encountered while creating pharmacy"})
    }
}