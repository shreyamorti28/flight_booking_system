import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
    const [passengers, setPassengers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        from: '',
        to: '',
        departureDate: '',
        arrivalDate: '',
        phone: '',
        email: ''
    });
    const [editingPhone, setEditingPhone] = useState(null);

    useEffect(() => {
        fetchPassengers();
    }, []);

    const fetchPassengers = async () => {
        const response = await axios.get('http://localhost:5000/passengers');
        setPassengers(response.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingPhone) {
            await axios.put(`http://localhost:5000/passengers/${editingPhone}`, formData);
            setEditingPhone(null);
        } else {
            await axios.post('http://localhost:5000/passengers', formData);
        }
        setFormData({
            name: '',
            from: '',
            to: '',
            departureDate: '',
            arrivalDate: '',
            phone: '',
            email: ''
        });
        fetchPassengers();
    };

    const handleDelete = async (phone) => {
        await axios.delete(`http://localhost:5000/passengers/${phone}`);
        fetchPassengers();
    };

    const handleEdit = (passenger) => {
        setFormData(passenger);
        setEditingPhone(passenger.phone);
    };

    return (
        <div>
            <h1>Flight Booking Management</h1>

            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input name="from" placeholder="From" value={formData.from} onChange={handleChange} required />
                <input name="to" placeholder="To" value={formData.to} onChange={handleChange} required />
                <input name="departureDate" placeholder="Departure Date" value={formData.departureDate} onChange={handleChange} required />
                <input name="arrivalDate" placeholder="Arrival Date" value={formData.arrivalDate} onChange={handleChange} required />
                <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <button type="submit">{editingPhone ? 'Update' : 'Add'} Passenger</button>
            </form>

            <h2>Passenger List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {passengers.map((passenger) => (
                        <tr key={passenger.phone}>
                            <td>{passenger.name}</td>
                            <td>{passenger.from}</td>
                            <td>{passenger.to}</td>
                            <td>{passenger.departureDate}</td>
                            <td>{passenger.arrivalDate}</td>
                            <td>{passenger.phone}</td>
                            <td>{passenger.email}</td>
                            <td>
                                <button onClick={() => handleEdit(passenger)}>Edit</button>
                                <button onClick={() => handleDelete(passenger.phone)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
