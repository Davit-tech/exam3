import joi from "joi";

export default {
    createPost: joi.object({
        title: joi.string().min(3).max(100).required(),
        text: joi.string().min(3).max(100).required(),
        author: joi.string().min(3).max(100).required(),
        date: joi.date().required(),


    }), editCreatedPost: joi.object({
        title: joi.string().min(3).max(100).required(),
        text: joi.string().min(3).max(100).required(),
        author: joi.string().min(3).max(100).required(),
        date: joi.date().required(),

    }),

};