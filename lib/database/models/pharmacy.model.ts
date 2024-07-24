import { Schema, Types, model, models } from "mongoose";

const PharmacySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    drugs: [{
        type: Types.ObjectId, ref: "Drug",
    }],
    working_hours: { type: String, required: true },
    pharmacist: { type: Types.ObjectId, ref: "Pharmacist" },
    orders: [{ type: Types.ObjectId, ref: "Order" }],
    coordinates: {
        lat: { type: Number, required: false },
        lng: { type: Number, required: false },
    }
})

const Pharmacy = models.Pharmacy || model("Pharmacy", PharmacySchema);
export default Pharmacy