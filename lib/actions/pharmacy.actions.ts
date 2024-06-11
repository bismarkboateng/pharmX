"use server"

import { connectToDatabase } from "../database"
import Pharmacy from "../database/models/pharmacy.model"


export const list = async (location: string) => {
    try {
        await connectToDatabase()
        const pharmacies = await Pharmacy.find({ location: location })
        return JSON.stringify(pharmacies)
    } catch (error) {
        throw error   
    }
}