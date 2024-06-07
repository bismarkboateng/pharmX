import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    stock_quantity: { type: Number, required: true },
    expiry_date: { type: Date, required: true },
    manufacturer_details: { type: String, required: true },
})

const Product = models.Product || model("Product", ProductSchema);
export default Product