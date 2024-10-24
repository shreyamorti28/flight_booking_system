const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    passengerName: String,
    from: String,
    to: String,
    departureDate: Date,
    arrivalDate: Date,
    phoneNumber: String,
    email: String
});

module.exports = mongoose.model('Passenger', passengerSchema);
