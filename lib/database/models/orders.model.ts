import { Schema, Types, model, models } from "mongoose";

const OrderSchema = new Schema({
    customer: { type: Types.ObjectId, ref: "Customer" },
    pharmacy: { type: Types.ObjectId, ref: "Pharmacy" },
    drugs: [ { type: Types.ObjectId, ref: "Drug" }],
    price: { type: String, required: true },
    status: { type: String, required: true },
}, { timestamps: true })

const Order = models.Order || model("Order", OrderSchema)
export default Order