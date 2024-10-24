const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://shreya:pass@cluster0.27dzl.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Passenger schema and model
const passengerSchema = new mongoose.Schema({
    name: String,
    from: String,
    to: String,
    departureDate: String,
    arrivalDate: String,
    phone: String,
    email: String,
});

const Passenger = mongoose.model('Passenger', passengerSchema);

// Routes

// Get all passengers
app.get('/passengers', async (req, res) => {
    try {
        const passengers = await Passenger.find();
        res.json(passengers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new passenger
app.post('/passengers', async (req, res) => {
    const passenger = new Passenger({
        name: req.body.name,
        from: req.body.from,
        to: req.body.to,
        departureDate: req.body.departureDate,
        arrivalDate: req.body.arrivalDate,
        phone: req.body.phone,
        email: req.body.email,
    });

    try {
        const newPassenger = await passenger.save();
        res.status(201).json(newPassenger);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update passenger details by phone number
app.put('/passengers/:phone', async (req, res) => {
    try {
        const updatedPassenger = await Passenger.findOneAndUpdate(
            { phone: req.params.phone },
            req.body,
            { new: true }
        );
        res.json(updatedPassenger);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete passenger by phone number
app.delete('/passengers/:phone', async (req, res) => {
    try {
        await Passenger.findOneAndDelete({ phone: req.params.phone });
        res.json({ message: 'Passenger deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
