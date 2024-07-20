import { Schema, Types, model, models } from "mongoose";

const CustomerSchema = new Schema({
    user: { type: Types.ObjectId, ref: "User"},   
    age: { type: String, required: false },
    location: { type: String, required: false },
    prescription: [{ type: Types.ObjectId, ref: "Prescription" }],
    id_number: { type: String, required: false },
    recipient_address: { type: String, required: false },
    recipient_contact: { type: String, required: false },
})

const Customer = models.Customer || model("Customer", CustomerSchema);
export default Customer