const multer =require('multer')



const storage = multer.diskStorage({
    destination:function(req, file , cb){
        console.log('i am working')
        req.newfile=req.file
        cb(null , './uploads/')
    }, 
    filename:function(req, file , cb){
        cb(null ,  Date.now().toString()+file.originalname  )
    }
})

const fileUploader =multer({storage:storage})

module.exports =fileUploader
