const router = require('express').Router();
const auth  = require('../middleware/auth');
const { Genre,validate } = require('../models/genres');


router.post('/add',auth,async (req,res)=>{
    
    const val= validate(req.body);
    // console.log('validate resp',val)
    if(val.error)
        return res.status(400).send({message:error.details[0].message});
    const genre = await Genre.findOne({genre:req.body.genre})
    if(genre)
        res.status(403).send({message:"Genre already exits"})
    // const hashedPassword = await bcrypt.hash(req.body.password,10);
    let newGenre = await Genre.create({
        ...req.body,        
    })
    res.status(200).send({data:newGenre,message:"Genre added successfully"})

});

module.exports = router;