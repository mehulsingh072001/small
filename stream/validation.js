const Joi = require('joi');

// Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
    })
    return schema.validate(data)
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string(),
        password: Joi.string()
    })
    return schema.validate(data)
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
