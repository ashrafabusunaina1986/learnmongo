import {Schema,model,models} from 'mongoose'

const imageSchema=new Schema({
    name:String,
    image:String
})

const Images=models.Images || model("Images",imageSchema)

export default Images