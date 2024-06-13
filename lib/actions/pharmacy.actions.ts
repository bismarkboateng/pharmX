"use server"

import { connectToDatabase } from "../database"
import Patient from "../database/models/patient.model"
import Pharmacy from "../database/models/pharmacy.model"
import Pharmacist from "../database/models/pharmacist.model"

const populatePharmacy = (query: any) => {
    return query
      .populate({ path: "pharmacist", model: Pharmacist, select: "_id name bio license_number" })
  }

export const list = async (patientId: string) => {
    try {
        await connectToDatabase()
        const currentPatient = await Patient.find({ authId: patientId })

        const pharmacies = await Pharmacy.find({ location: currentPatient[0].location })
        return JSON.stringify(pharmacies)
    } catch (error) {
        throw error   
    }
}

export const read = async (pharmacyId: string) => {
    try {
        await connectToDatabase()
        const pharmacy = await populatePharmacy(Pharmacy.findById(pharmacyId))
        return JSON.stringify(pharmacy)
    } catch (error) {
     throw error   
    }
}