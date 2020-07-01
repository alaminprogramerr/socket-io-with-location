module.exports={
    shopCreateValidator(req){
        console.log(req.body.tags)
        let err={}
        if(!req.body.name){
            err.name="Name required !!"
        }
        if(!req.body.lat){
            err.lat="Lat required !"
        }
        if(!req.body.lng){
            err.lng="Lng required !!"
        }
        if(!req.body.description){
            err.description="Description required !!"
        }
        if(!req.body.file){
            err.images="Please selict some image up to 5  !!"
        }
        if(!req.body.logo){
            err.images="Please selict logo  !!"
        }
        if(!req.body.tags){
            console.log('tags',req.body.tags)
            err.tags="Tags required !!"
        }
        return {
            err:err,
            isValid:Object.keys(err).length===0
        }
    }
}