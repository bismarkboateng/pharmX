import { Schema, model, models } from "mongoose";

const DrugSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    require_prescription: { type: Boolean, required: true },
    stock_quantity: { type: Number, required: true },
    expiry_date: { type: Date, required: true },
    manufacturer_details: { type: String, required: true },
})

const Drug = models.Drug || model("Drug", DrugSchema);
export default Drug