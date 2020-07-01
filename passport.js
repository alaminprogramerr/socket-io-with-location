const RegisterModel =require('./model/registerModel')
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


module.exports=passport=>{
    passport.use(new JwtStrategy(opts, function(payload, done) {
        RegisterModel.findOne({id: payload._id})
        .then(user=>{
            if(!user){
               return done(null, false)
            }else{
                return done(null, user)
            }
        })
        .catch(err=>{
            console.log(err)
            return done(err)
        })
    }));
}

