import { Schema, Types, model, models } from "mongoose";

const PharmacistSchema = new Schema({
    user: { type: Types.ObjectId, ref: "User"},
    license_number: { type: String, required: false },
    experience_level: { type: String, required: false },
    pharmacy: { type: Types.ObjectId, ref: "Pharmacy" },
});

const Pharmacist = models.Pharmacist || model("Pharmacist", PharmacistSchema);
export default Pharmacist