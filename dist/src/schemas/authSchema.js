import joi from "joi";
export var signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(10).required(),
    passwordConfirmation: joi.ref("password")
});
