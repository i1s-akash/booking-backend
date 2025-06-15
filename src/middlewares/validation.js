const { body, param, validationResult } = require('express-validator');

const validateError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
}

const validateCreateBooking = () => {
    return [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Email is invalid'),
        body('slotId').isMongoId().withMessage('Slot ID is invalid')
    ]
}

const validateBookingId = () => {
    return [
        param('id').isMongoId().withMessage('Booking ID is invalid'),
    ]
}

module.exports = { validateError, validateCreateBooking, validateBookingId };