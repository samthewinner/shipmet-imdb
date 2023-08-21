const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passwordComplexity = require('joi-password-complexity');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },		
});

userSchema.methods.generateAuthToken = (user)=>{ 
    // console.log(user.name);
    const token = jwt.sign({ _id: user._id, name: user.name},process.env.JWTSECRETKEY);

    // const data = jwt.verify(token,process.env.JWTSECRETKEY);
    // console.log('this is data extracted from jwt token: ',data);
    
    console.log('Inside generateAuthToken',token);
    return token;
}

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(10).required(),
		email: Joi.string().email().required(),
		password: passwordComplexity().required(),		
	});
	return schema.validate(user);
};

const User = mongoose.model('user',userSchema);
module.exports = {User,validate}