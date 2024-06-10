"use server"

import { connectToDatabase } from "../database"
import Patient from "../database/models/patient.model"



export const createPatient = async (patient: createPatientParams) => {
    try {
        await connectToDatabase()
        const createdPatient = await Patient.create(patient)
        return JSON.stringify(createdPatient)
    } catch (error) {
        throw error
    }
}