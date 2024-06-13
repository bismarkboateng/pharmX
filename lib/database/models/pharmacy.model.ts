import { Schema, Types, model, models } from "mongoose";

const PharmacySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: false },
    drugs: [{
        type: Types.ObjectId, ref: "Drug", required: true
    }],
    working_hours: { type: String, required: true },
    pharmacist: { type: Types.ObjectId, ref: "Pharmacist", required: true },
})

const Pharmacy = models.Pharmacy || model("Pharmacy", PharmacySchema);
export default Pharmacy