const {userschema}= require('../DB/DBschema')

async function checkuser(req,res,next){
    const username= req.headers.username;
    const password=req.headers.password;
   
   const isUserValid= await userschema.findOne({
        username:username,
        password:password
    })
    if(!isUserValid) return res.status(404).json("Invalid User")

    next()

}

module.exports={
    checkuser
}