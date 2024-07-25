import { model, models, Schema } from "mongoose";

const IdSchema = new Schema({
    id: { type: String, required: true },
}, { timestamps: true })

const ID = models.ID || model("ID", IdSchema)
export default ID 