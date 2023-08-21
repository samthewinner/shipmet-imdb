const router = require('express').Router();
const {User,validate} = require('../models/user')
const bcrypt = require('bcrypt');
// const auth = require('../middleware/auth')
// const admin = require('../middleware/admin')
// const validObjectId = require('../middleware/validObject')



// create user
router.post('/create',async(req,res)=>{    
    const val= validate(req.body);
    console.log('validate resp',val)
    if(val.error)
        return res.status(400).send({message:error.details[0].message});
    const user = await User.findOne({email:req.body.email})
    if(user)
        res.status(403).send({message:"User already exits"})
    const hashedPassword = await bcrypt.hash(req.body.password,10);    
    let newUser = await User.create({
        ...req.body,
        password:hashedPassword,
    })
    newUser.password = undefined;
    newUser.__v = undefined;

    res.status(200).send({data:newUser,message:"Account created successfully"})
})

router.get('/',async (req,res)=>
{
    const users = await User.find();
    if(users != undefined && users.length == 0)
        return res.status(200).send("No user exists")
    return res.status(200).json({data:users})

})

router.post('/login',async (req, res, next) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (!user) return res.status(404).json({
        success: false,
        message: "Invalid email or password",
    })
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(404).json({
        success: false,
        message: "Invalid email or password",
    });

    // sendCookie(user, res, `Welcome back ${user.name}`, 200);
    const token = user.generateAuthToken(user);
    console.log(token);
    res.status(200).send({"message":"Logged in successfully"});

});

router.get('/test',async(req,res)=>{
    res.send({"message":"WORKING FINE🥰"})
})

module.exports = router;