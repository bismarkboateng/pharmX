import { Schema, Types, model, models } from "mongoose";

const PharmacySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: false },
    inventory: {
        products: [{
            type: Types.ObjectId, ref: "Product", required: true
        }]
    },
    working_hours: { type: String, required: true }
})

const Pharmacy = models.Pharmacy || model("Pharmacy", PharmacySchema);
export default Pharmacy