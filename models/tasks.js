import mongoose, { Schema,model,models } from "mongoose";

const tasksSchema = new Schema(
    {
        title: String,
        description: String,
    }
)

const Tasks=models.Tasks || model("Tasks",tasksSchema)

export default Tasks