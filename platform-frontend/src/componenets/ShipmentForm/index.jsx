import React, { useState } from 'react';
import { createShipment } from '../../api';

function ShipmentForm() {

    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [waybill, setWaybill] = useState('');


    const handleShipmentCreation = async (event) => {
        event.preventDefault();

        if (!name || !waybill) {
            setError('All fields are required');
            return;
        }

        try {
            createShipment(waybill, address, name, number);
            setName("");
            setNumber("");
            setAddress("");
            setWaybill("");

        } catch (error) {
            console.error('failed:', error);
        }
    };

    return (
        <div className="create-form-container">
            <div className="form-header">
                <h1>Create Shipment</h1>
            </div>

            <form className="create-form">

                <div className="label-input">
                    <label htmlFor="name">Name </label>
                    <input required id="name" name="name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="label-input">
                    <label htmlFor="address">Address </label>
                    <input required id="address" name="address" type="text" placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div className="label-input">
                    <label htmlFor="waybill">WayBill </label>
                    <input required id="waybill" name="waybill" type="text" placeholder="waybill" value={waybill} onChange={(e) => setWaybill(e.target.value)} />
                </div>

                <div className="label-input">
                    <label htmlFor="number">Number </label>
                    <input required id="number" name="number" type="text" placeholder="phone number" value={number} onChange={(e) => setNumber(e.target.value)} />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button className='black-button' type="submit" onClick={handleShipmentCreation}>Create</button>
            </form>
        </div>
    )
}

export default ShipmentForm