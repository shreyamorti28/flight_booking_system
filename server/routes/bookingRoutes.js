const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');

// 1. Insert Passenger details
router.post('/', async (req, res) => {
    const { passengerName, from, to, departureDate, arrivalDate, phoneNumber, email } = req.body;

    const newBooking = new Booking({
        passengerName,
        from,
        to,
        departureDate,
        arrivalDate,
        phoneNumber,
        email,
    });

    try {
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 2. Delete Passenger record based on Phone Number
router.delete('/:phoneNumber', async (req, res) => {
    try {
        const booking = await Booking.findOneAndDelete({ phoneNumber: req.params.phoneNumber });
        if (booking) {
            res.json({ message: 'Passenger record deleted' });
        } else {
            res.status(404).json({ message: 'Passenger not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Update Passenger details based on Phone Number
router.put('/:phoneNumber', async (req, res) => {
    const { passengerName, from, to, departureDate, arrivalDate, email } = req.body;
    try {
        const booking = await Booking.findOneAndUpdate(
            { phoneNumber: req.params.phoneNumber },
            {
                passengerName,
                from,
                to,
                departureDate,
                arrivalDate,
                email,
            },
            { new: true }
        );
        if (booking) {
            res.json(booking);
        } else {
            res.status(404).json({ message: 'Passenger not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Display/ View all Flight Booking Details
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
