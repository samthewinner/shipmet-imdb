const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const passwordComplexity = require('joi-password-complexity');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
	genre: { type: String, required: true },		
});

// userSchema.methods.generateAuthToken = (user)=>{ 
//     // console.log(user.name);
//     const token = jwt.sign({ _id: user._id, name: user.name},process.env.JWTSECRETKEY);

//     // const data = jwt.verify(token,process.env.JWTSECRETKEY);
//     // console.log('this is data extracted from jwt token: ',data);
    
//     // console.log('Inside generateAuthToken',token);
//     return token;
// }

const validate = (genre) => {
    const schema = Joi.object({        
		genre: Joi.string().required(),			
	});
	return schema.validate(genre);
};

const Genre = mongoose.model('genre',genreSchema);
module.exports = {Genre,validate}