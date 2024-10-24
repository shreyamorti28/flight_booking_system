import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PassengerForm = () => {
    const [passenger, setPassenger] = useState({
        passengerName: '',
        from: '',
        to: '',
        departureDate: '',
        arrivalDate: '',
        phoneNumber: '',
        email: ''
    });

    const [passengers, setPassengers] = useState([]);
    const [phoneNumberToUpdate, setPhoneNumberToUpdate] = useState('');

    useEffect(() => {
        fetchPassengers();
    }, []);

    const fetchPassengers = async () => {
        const response = await axios.get('/api/bookings');
        setPassengers(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (phoneNumberToUpdate) {
            await axios.put(`/api/bookings/${phoneNumberToUpdate}`, passenger);
            setPhoneNumberToUpdate('');
        } else {
            await axios.post('/api/bookings', passenger);
        }
        setPassenger({
            passengerName: '',
            from: '',
            to: '',
            departureDate: '',
            arrivalDate: '',
            phoneNumber: '',
            email: ''
        });
        fetchPassengers();
    };

    const handleDelete = async (phoneNumber) => {
        await axios.delete(`/api/bookings/${phoneNumber}`);
        fetchPassengers();
    };

    const handleUpdate = (phoneNumber) => {
        const passengerToUpdate = passengers.find(p => p.phoneNumber === phoneNumber);
        setPassenger(passengerToUpdate);
        setPhoneNumberToUpdate(phoneNumber);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Passenger Name"
                    value={passenger.passengerName}
                    onChange={(e) => setPassenger({ ...passenger, passengerName: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="From"
                    value={passenger.from}
                    onChange={(e) => setPassenger({ ...passenger, from: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="To"
                    value={passenger.to}
                    onChange={(e) => setPassenger({ ...passenger, to: e.target.value })}
                    required
                />
                <input
                    type="date"
                    value={passenger.departureDate}
                    onChange={(e) => setPassenger({ ...passenger, departureDate: e.target.value })}
                    required
                />
                <input
                    type="date"
                    value={passenger.arrivalDate}
                    onChange={(e) => setPassenger({ ...passenger, arrivalDate: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={passenger.phoneNumber}
                    onChange={(e) => setPassenger({ ...passenger, phoneNumber: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={passenger.email}
                    onChange={(e) => setPassenger({ ...passenger, email: e.target.value })}
                    required
                />
                <button type="submit">{phoneNumberToUpdate ? 'Update Passenger' : 'Add Passenger'}</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Passenger Name</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Departure Date</th>
                        <th>Arrival Date</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {passengers.map((p) => (
                        <tr key={p.phoneNumber}>
                            <td>{p.passengerName}</td>
                            <td>{p.from}</td>
                            <td>{p.to}</td>
                            <td>{new Date(p.departureDate).toLocaleDateString()}</td>
                            <td>{new Date(p.arrivalDate).toLocaleDateString()}</td>
                            <td>{p.phoneNumber}</td>
                            <td>{p.email}</td>
                            <td>
                                <button onClick={() => handleUpdate(p.phoneNumber)}>Edit</button>
                                <button onClick={() => handleDelete(p.phoneNumber)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PassengerForm;
