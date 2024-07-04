"use server"

import { connectToDatabase } from "../database";
import Pharmacist from "../database/models/pharmacist.model";
import { getUserId } from "./customer.actions";


type createPharmacistProps = {
    name: string;
    email: string;
    license_number: string;
    phone: string;
    experience_level: string;
    address: string;
    bio: string;
    onboardered: boolean;
}
export const updatePharmacist = async (data: createPharmacistProps) => {
    try {
        await connectToDatabase()
        
        const pharmacistId = await getUserId()
        const pharmacist = await Pharmacist.findByIdAndUpdate(pharmacistId, data, { new: true })
        if (!pharmacist) {
            return JSON.stringify({ msg: "could not find pharmacist info" })
        }
        return JSON.stringify({ msg: "updated successfully", pharmacist: pharmacist })
    } catch (error) {
        return JSON.stringify({ msg: "error creating pharmacist"})
    }
}