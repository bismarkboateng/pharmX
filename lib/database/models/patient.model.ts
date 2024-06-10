import { Schema, model, models } from "mongoose";

const PatientSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    location: { type: String, required: true },
    authId: { type: String, required: true }
})

const Patient = models.Patient || model("Patient", PatientSchema);
export default Patient