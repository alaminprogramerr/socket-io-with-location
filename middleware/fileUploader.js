const multer =require('multer')



const storage = multer.diskStorage({
    destination:function(req, file , cb){
        cb(null , './uploads/')
    }, 
    filename:function(req, file , cb){
        cb(null ,  Date.now().toString()+file.originalname  )
    }
})

const fileUploader =multer({storage:storage})

module.exports =fileUploader
