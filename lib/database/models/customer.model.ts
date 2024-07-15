import { Schema, Types, model, models } from "mongoose";

const CustomerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: false },
    age: { type: String, required: false },
    image: { type: String, required: false },
    contact: { type: String, required: false },
    location: { type: String, required: false },
    authId: { type: String, required: false },
    onboarded: { type: Boolean, required: false },
    prescription: [{ type: Types.ObjectId, ref: "Prescription" }],
    ID: { type: String, required: false },
})

const Customer = models.Customer || model("Customer", CustomerSchema);
export default Customer