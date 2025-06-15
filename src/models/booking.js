const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v)
            },
            message: props => `${props.value} is not a valid email format!`
        }
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
        required: [true, 'Slot is required']
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Booking', bookingSchema);