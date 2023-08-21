const router = require('express').Router();
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
// const { route } = require('./users');

router.post('/',async (req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user)
        return res.status(400).send({message:"Invalid email or password"});

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword)
        return res.status(400).send({message:"Invalid email or password"})
    const token = user.generateAuthToken(user);
    console.log("User this token for logging into a particular user: \n",user);
    res.status(200).json({data:token,message:"Sigining in please wait..."})    
})

module.exports = router