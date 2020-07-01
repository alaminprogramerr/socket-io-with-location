const mongose = require ('mongoose')
const Schema= mongose.Schema

const  shopScema= new Schema({
    id:String,
    name:{
        type:String
    },
    logo:{
        type:String
    },
    lat:{
        type:String
    },
    lng:{
        type:String
    },
    description:{
        type:String
    },
    images:{
        type:Array
    },
    tags:{
        type:Array
    },
    createdAt:{
        type:String
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:"registerModel"
    }
})

const shopModel = mongose.model('shopModel' , shopScema)
module.exports= shopModel