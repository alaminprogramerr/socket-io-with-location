const shopRouter = require('express')()
const shopControle=require('../controler/shopControler')
const fileUploader= require('../middleware/fileUploader')
const authenticate=require('../middleware/authenticate')

// here while test it  you should pass file  wiht name file 
// for ex:  at postman formdata field name will be file then it will work properly this is rull 
shopRouter.post('/upload' , authenticate, fileUploader.single('file'),  shopControle.upload)
shopRouter.post('/store/create', authenticate, fileUploader.array('file', 5), shopControle.createStore)

shopRouter.post('/store/update', authenticate, fileUploader.array('file', 5), shopControle.updateStore)
shopRouter.post('/store/delete', authenticate, shopControle.deleteStore)
// we should pass single store _id in  req.params  then we will got  exect this store  if avilable 
shopRouter.get('/store/user/:id', shopControle.getSomeStore)

shopRouter.get('/store/:id' , shopControle.getSingleStore)
shopRouter.post('/store/list' , shopControle.filter)


module.exports= shopRouter