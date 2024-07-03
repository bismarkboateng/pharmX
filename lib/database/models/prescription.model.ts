import { Schema, model, models, Types } from "mongoose";

const PrescriptionSchema = new Schema({
    customer: { type: Types.ObjectId, ref: "Customer" },
    file: { type: String, required: true },
    date_issued: { type: Date, required: true },
    drugs: [
        { type: Types.ObjectId, ref: "Drug", required: true }
    ],
    dosage_instructions: { type: String, required: true },
})

const Prescription = models.Prescription || model("Prescription", PrescriptionSchema);
export default Prescription