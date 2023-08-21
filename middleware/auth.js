const jwt = require('jsonwebtoken');

module.exports = async (req,res,next)=>{
    console.log('req header',req.header('x-auth-token'));
    const token = req.header('x-auth-token');
    if(!token)
        return res.status(400).send({message:"Access denied,no token provided"});
    
    jwt.verify(token,process.env.JWTSECRETKEY,(e,validToken)=>{
        if(e){
            return res.status(400).send({message:"Invalid token"})
        }
        req.user =  validToken;
        next();
    })
}