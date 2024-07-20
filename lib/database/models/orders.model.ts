import { Schema, Types, model, models } from "mongoose";
import { string } from "zod";

const OrderSchema = new Schema({
    customer: { type: Types.ObjectId, ref: "Customer" },
    pharmacy: { type: Types.ObjectId, ref: "Pharmacy" },
    drugs: [ { type: Types.ObjectId, ref: "Drug" }],
    status: { type: String, required: true },
    orderId: { type: String, required: false },
}, { timestamps: true })

const Order = models.Order || model("Order", OrderSchema)
export default Order