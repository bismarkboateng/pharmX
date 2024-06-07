import { Schema, Types, model, models } from "mongoose";

const PharmacySchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    pharmacist: { type: Types.ObjectId, ref: "Pharmacist", required: true },
    inventory: { type: Types.ObjectId, ref: "Inventory", required: true },
})

const Pharmacy = models.Pharmacy || model("Pharmacy", PharmacySchema);
export default Pharmacy