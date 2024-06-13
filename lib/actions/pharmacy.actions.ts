"use server"

import { connectToDatabase } from "../database"
import Patient from "../database/models/patient.model"
import Pharmacy from "../database/models/pharmacy.model"
import Pharmacist from "../database/models/pharmacist.model"
import Drug from "../database/models/drugs.model"

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

export const fetchPharmacyDrugs = async (pharmacyId: string) => {
    try {
        const pharmacy = await Pharmacy.findById(pharmacyId)

        if (!pharmacy) {
            return JSON.stringify({ error: "Pharmacy not found" })
        }
        const drugs = await Drug.find({ "_id": { $in: pharmacy.drugs } })
        return JSON.stringify(drugs)
    } catch (error) {
        throw error
    }
}