import { Schema, model, models } from "mongoose";

const demoSchema = new Schema({
    email: String,
    password: String
}
)

const Demo = models.Demo || model("Demo", demoSchema)

export default Demo