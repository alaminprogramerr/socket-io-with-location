const express=require('express')
const userRouter = express()
const userControler= require('../controler/userControler')
const authenticate =require('../middleware/authenticate')

userRouter.post('/auth/login' ,userControler.loginControler)
userRouter.post('/auth/register', userControler.registerControler)
userRouter.post('/auth/forget',   userControler.forget)
userRouter.post('/auth/reset' , authenticate , userControler.reset)
userRouter.get('/auth/me',authenticate, userControler.getMe)
userRouter.post('/auth/me', authenticate , userControler.postMe)


 module.exports= userRouter