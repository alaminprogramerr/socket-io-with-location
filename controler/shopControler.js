const RegisterModel=require('../model/registerModel')
const shopModel=require('../model/shopModel')
const shopValidator=require('../validator/shopValidator')

// /uploae
const upload=(req, res)=>{
    if(!req.file){
        return res.status(400).json({massage:"Please choose a file " , status:false})
    }
    RegisterModel.findOneAndUpdate({email:req.user.email})
    .then(user=>{
        user.file=req.file.path
        user.save()
        .then(update=>{
            console.log(update)
            res.status(200).json({status:true, massage:'File uploaded successfully', url:req.file.path})
        })
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({massage:"Server error occurd"})
    })

}
// create/store
const  createStore=(req, res)=>{
    const verify = shopValidator.shopCreateValidator(req)
    if(!verify.isValid){
        return res.status(400).json(verify.err)
    }
    let images=req.body.file.split(',')
    let tags=req.body.tags.split(',')
    req.files.forEach(element => {
        images.push(element.path)
    });
    
    const newShop=new shopModel({
        _id:require('mongoose').Types.ObjectId(),
        name:req.body.name,
        lat:req.body.lat,
        lng:req.body.lng,
        description:req.body.description,
        images:images,
        tags:tags,
        creator:req.user.id,
        createdAt:new Date().toDateString(),
        logo:req.body.logo
    })
    newShop.save()
    .then(shop=>{
        console.log(shop)
        res.json({status:true, massage:"Shop created success !"})
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({massage:"Server error occurd"})
    })
}
// /store/update
const  updateStore=(req, res)=>{
    if(!req.headers.id){
        return  res.status(400).json({massage:"No id founded in hearders"})
    }
    if(req.body.tags.length<1){
        return res.status(400).json({massage:"No tag fund", status:false})
    }


    
    shopModel.findOne({_id:req.headers.id})
    .then(data=>{
        console.log(data)
        if(!data){
            return res.status(400).json({massage:"Store not funded" , status:false})
        }
        if( data.creator==req.user.id){
            
                let images =[]
                let tags
                if(req.body.tags){    
                    tags=req.body.tags.split(',')
                }
                if(req.files){
                    req.files.forEach(element => {
                        images.push(element.path)
                    });
                }
                shopModel.findByIdAndUpdate({_id:req.headers.id})
                .then(data=>{
                    
                    data.name=req.body.name,
                    data.lat=req.body.lat,
                    data.lng=req.body.lng,
                    data.description=req.body.description,
                    data.images=images,
                    data.tags=tags,
                    data.logo=''
                    data.save()
                    .then(result=>{
                        console.log(result)
                        res.status(200).json({status:true,massage:"shop updated"})
                    })
                    .catch(err=>{
                        console.log(err)
                        res.status(500).json({massage:"server error occurd"})
                    })
                })
                .catch(err=>{
                    console.log(err)
                    res.json({massge:"server error occurd"})
                })
        }
        else{
            return res.status(400).json({massage:"You have no permission to edite  this store !!!", status:false})
        }
    })
    .catch(err=>{
        console.log(err)
    })
    // =================
}


// /store/delete
const  deleteStore=(req, res)=>{
    shopModel.findOne({_id:req.headers.id})
    .then(data=>{
        console.log(data)
        if(!data){
            return res.status(400).json({massage:"Store not funded" , status:false})
        }
        console.log(data)
        console.log(req.user.id)

        if( data.creator==req.user.id){
            shopModel.findByIdAndDelete({_id:req.headers.id})
            .then(data=>{
                if(!data){
                    return res.status(404).json({status:false , massage:"shop not found !"})
                }
                    res.status(200).json({status:true, massage:"Shop deleted !"})
            })
            .catch(err=>{
                console.log(err)
                res.json({massge:"server error occurd"})
            })
        }
        else{
            return res.status(400).json({massage:"You have no permission to delete  this store !!!", status:false})
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

// /store/:id
// single store founding by giving id in params 
const  getSingleStore=(req, res)=>{
	shopModel.findOne({_id:req.params.id}).populate('RegisterModel').exec((err, data)=>{
        
        if(!data){
            return res.status(404).json({status:false , massage:"shop not found !"})
        }
        res.status(200).json(data)
    })
}
// /store/user/:id
// finding all store under a creator  by giving id in params 
const  getSomeStore=(req, res)=>{
	shopModel.find({creator:req.params.id}).populate('RegisterModel').exec((err, data)=>{
        
        if(!data){
            return res.status(404).json({status:false , massage:"shop not found !"})
        }
        res.status(200).json(data)
    })
}
// /store/user/:id
// finding all store under a creator  by giving id in params 
const  filter=(req, res)=>{
    let {tags}=req.body
    if(!tags){
        return res.json({massage:"Please input tag " , status:false})
    }else if( tags.length<1){
        return res.json({massage:"Please input tag " , status:false})
    }
	shopModel.find().populate('RegisterModel').exec((err, data)=>{
        if(!data){
            return res.status(404).json({status:false , massage:"shop not found !"})
        }
        if(data.length<1){
            return res.status(404).json({status:false , massage:"shop not found !"})
        }

       let  LLf=data.filter(single=>{
            return true
        })
        // if(LLf<1){
        //     return res.status(404).json({massage:" No match founded "})
        // }
        // if(!req.body.tags ){
        //     return res.status(200).json(LLf)
        // }else if( ! req.body.tags.length>0){
        //     return res.status(200).json(LLf)
        // }
        let tagFiltered =[]
        LLf.forEach(element => {
                let able=0
                for( i = 0; i < element.tags.length; i++){
                    for( k = 0; k < tags.length; k++){
                        if (element.tags[i].trim() == tags[k].trim()){
                            console.log(tags[k] ,"=",element.tags[i])
                            able=1
                        }
                    }
                }
                
            if(able){
                tagFiltered.push(element)
            }

        });
        return res.status(200).json({tagFiltered:tagFiltered})
    })
}
module.exports={
    upload,
    createStore,
    updateStore,
    deleteStore,
    getSingleStore,
    getSomeStore,
    filter

}


