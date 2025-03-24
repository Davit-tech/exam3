import joi from "joi";

export default {
    register: joi.object({
        firstname: joi.string().min(3).max(50).required(),
        lastname: joi.string().min(3).max(50).required(),
        email: joi.string().email().required(),
        password: joi.string().min(3).max(50).required(),


    }),
    login: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),
    loginEdit: joi.object({
        firstname: joi.string().min(3).max(50).required(),
        lastname: joi.string().min(3).max(50).required(),
        email: joi.string().email().required(),
    })
};