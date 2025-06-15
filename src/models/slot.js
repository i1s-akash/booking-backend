const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
        validate: {
            validator: function (v) {
                return /^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(v);
            },
            message: props => `${props.value} is not a valid time format! Use HH:MM (24-hour format).`
        }
    },
    endTime: {
        type: String,
        required: [true, 'End time is required'],
        validate: {
            validator: function (v) {
                return /^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(v);
            },
            message: props => `${props.value} is not a valid time format! Use HH:MM (24-hour format).`
        }
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        default: null
    }
})

slotSchema.pre('save', function (next) {
    if (this.startTime >= this.endTime) {
        return next(new Error('Start time must be before end time'));
    }
    next();
}
);

module.exports = mongoose.model('Slot', slotSchema);