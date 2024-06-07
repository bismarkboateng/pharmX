import { Schema, Types, model, models } from "mongoose";

const PharmacistSchema = new Schema({
    type: { type: Types.ObjectId, ref: "User", required: true },
    license_number: { type: String, required: true },
    work_hours: { type: String, required: true },
    pharmacy: { type: Types.ObjectId, ref: "Pharmacy", required: true },
});

const Pharmacist = models.Pharmacist || model("Pharmacist", PharmacistSchema);
export default Pharmacist