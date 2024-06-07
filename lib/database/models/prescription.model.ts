import { Schema, model, models } from "mongoose";

const PrescriptionSchema = new Schema({
    patientId: { type: String, required: true },
    file: { type: String, required: true },
    date_issued: { type: Date, required: true },
    medicines: [
        { type: String, required: true }
    ],
    dosage_instructions: { type: String, required: true },
})

const Prescription = models.Prescription || model("Prescription", PrescriptionSchema);
export default Prescription