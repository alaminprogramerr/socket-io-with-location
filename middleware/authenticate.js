const passport =require('passport')
const jwt =require('jsonwebtoken')

const authenticate =(req, res, next)=>{
    try {
        
        let token  =req.headers.authorization.split(' ')[1]
        const decoded=jwt.verify(token , 'secret')
        req.user=decoded
        console.log('authenticate success')
        next()
    } catch (error) {
        return res.status(400).json({massage:"Authentication faild", status:false})
    }
}
module.exports =authenticate


