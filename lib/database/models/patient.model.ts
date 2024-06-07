import { Schema, Types, model, models } from "mongoose";

const PatientSchema = new Schema({
    type: { type: Types.ObjectId, ref: "User", required: true },
    location: { type: String, required: true },
})

const Patient = models.Patient || model("Patient", PatientSchema);
export default Patient