const express = require('express');
const Booking = require('../models/booking');
const Slot = require('../models/slot');
const { validateCreateBooking, validateError, validateBookingId } = require('../middlewares/validation');


const bookingRouter = express.Router();
bookingRouter.post('/create', validateCreateBooking(), validateError, async (req, res) => {
    const { name, email, slotId } = req.body;

    try {
        const existingBooking = await Booking.findOne({ email });
        if (existingBooking) {
            return res.status(400).json({ message: 'You already have a booking. Only one booking per email is allowed.' });
        }

        const isExistingSlot = await Slot.findById(slotId);
        if (!isExistingSlot) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        if (isExistingSlot.isBooked) {
            return res.status(400).json({ message: 'Slot is already booked' });
        }

        const booking = new Booking({
            name,
            email,
            slot: slotId
        });
        await booking.save();

        isExistingSlot.isBooked = true;
        isExistingSlot.booking = booking._id;
        await isExistingSlot.save();

        res.status(201).json({
            message: 'Booking created successfully',
            booking
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong!!!',
            error: err.message
        });
    }
})

bookingRouter.get('/all', async (req, res) => {
    try {
        const bookings = await Booking.find().populate({
            path: 'slot',
            select: '-booking -__v'
        });
        res.status(200).json({
            message: 'Bookings fetched successfully',
            bookings
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong!!!',
            error: err.message
        });
    }
})

bookingRouter.get('/:id', validateBookingId(), validateError, async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findById(id).populate('slot').populate({
            path: 'slot',
            select: '-booking -__v'
        });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({
            message: 'Booking fetched successfully',
            booking
        })
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong!!!',
            error: err.message
        });
    }
})

module.exports = bookingRouter;