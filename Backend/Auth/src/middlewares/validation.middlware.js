import {body,validationResult} from "express-validator"
async function validate(req,res,next) {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()});

    }
    next();
}

export const registerUserValidationRules=[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 character'),
    body('fullName.firstName').notEmpty().withMessage('First name is required'),
    body('fullName.lastName').notEmpty().withMessage('Last name is required'),
    validate
]