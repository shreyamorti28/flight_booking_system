const express = require('express');
const router = express.Router();
const Passenger = require('../models/Passenger');

// 1. Insert Passenger Details (POST)
router.post('/', async (req, res) => {
    try {
        const newPassenger = new Passenger(req.body);
        await newPassenger.save();
        res.status(201).json(newPassenger);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. Delete Passenger by Phone Number (DELETE)
router.delete('/:phoneNumber', async (req, res) => {
    try {
        const passenger = await Passenger.findOneAndDelete({ phoneNumber: req.params.phoneNumber });
        if (!passenger) return res.status(404).json({ message: "Passenger not found" });
        res.json({ message: "Passenger deleted", passenger });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Update Passenger by Phone Number (PUT)
router.put('/:phoneNumber', async (req, res) => {
    try {
        const passenger = await Passenger.findOneAndUpdate(
            { phoneNumber: req.params.phoneNumber },
            req.body,
            { new: true }
        );
        if (!passenger) return res.status(404).json({ message: "Passenger not found" });
        res.json(passenger);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Display Passenger Details (GET)
router.get('/', async (req, res) => {
    try {
        const passengers = await Passenger.find();
        res.json(passengers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
