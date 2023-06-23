const { body, validationResult } = require('express-validator')

const validFields = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "error",
            errors: errors.mapped()
        })
    }
    next()
}

exports.createUserValidator = [
    body('name')
        .notEmpty()
        .withMessage("Name cannot be empty"),
    body('email')
        .notEmpty()
        .withMessage("Email cannot be empty") 
        .isEmail()
        .withMessage("Must be a valid email"),
    body('password')
        .notEmpty()
        .withMessage("Password cannot be empty") 
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    validFields,
]

exports.loginUserValidator = [
    body('email')
        .notEmpty()
        .withMessage("Email cannot be empty") 
        .isEmail()
        .withMessage("Must be a valid email"),
    body('password')
        .notEmpty()
        .withMessage("Password cannot be empty") 
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    validFields,
]

exports.createRepairsValidator = [
    body('date')
        .notEmpty()
        .withMessage("Date cannot be empty"),
    body('motorsNumber')
        .notEmpty()
        .withMessage("motorsNumber cannot be empty")
        .isLength({ min: 6})
        .withMessage("Must be at least 6 characters"),
    body('description')
        .notEmpty()
        .withMessage("Description cannot be empty"), 
    validFields,
]

