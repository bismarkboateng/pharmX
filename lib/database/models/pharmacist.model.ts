import { Schema, Types, model, models } from "mongoose";

const PharmacistSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    license_number: { type: String, required: true },
    work_hours: { type: String, required: true },
    pharmacy: { type: Types.ObjectId, ref: "Pharmacy", required: true },
});

const Pharmacist = models.Pharmacist || model("Pharmacist", PharmacistSchema);
export default Pharmacist