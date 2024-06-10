"use server"

import { connectToDatabase } from "../database"
import Patient from "../database/models/patient.model"
import { cookies } from "next/headers"
export const setPatientId = (id: string) => {
    cookies().set("patientId", id)
}

export const checkPatient = async (email: string) => {
    try {
        await connectToDatabase()
        const patient = await Patient.find({ email: email })
        if (patient) {
            return JSON.stringify({ patientExist: true })
        }
        return JSON.stringify({ patientExist: false })
    } catch (error) {
        throw error
    }
}

export const createPatient = async (patient: createPatientParams) => {
    try {
        await connectToDatabase()
        const createdPatient = await Patient.create(patient)
        return JSON.stringify(createdPatient)
    } catch (error) {
        throw error
    }
}