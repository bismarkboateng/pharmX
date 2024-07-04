import { Schema, Types, model, models } from "mongoose";

const PharmacistSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: false },
    bio: { type: String, required: false },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    license_number: { type: String, required: false },
    onboardered: { type: Boolean, required: false },
    experience_level: { type: String, required: false },
    pharmacy: { type: Types.ObjectId, ref: "Pharmacy" },
});

const Pharmacist = models.Pharmacist || model("Pharmacist", PharmacistSchema);
export default Pharmacist