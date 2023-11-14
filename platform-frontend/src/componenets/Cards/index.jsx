import React, { useState } from 'react';
import { deleteShipment, updateShipment } from '../../api';

function Cards({ shipments, fetchData }) {
    const [updateFormVisible, setUpdateFormVisible] = useState([]);
    const [updateFormData, setUpdateFormData] = useState([]);

    if (!shipments) {
        return <p className='empty-state'>Loading Shipments ...</p>;
    } else if (shipments.length === 0) {
        return <p className='empty-state'>Loading Shipments.</p>;
    }

    if (updateFormVisible.length !== shipments.length) {
        setUpdateFormVisible(Array(shipments.length).fill(false));
        setUpdateFormData(Array(shipments.length).fill({
            waybill: '',
            name: '',
            address: '',
            number: '',
        }));
    }

    const handleDelete = async (id) => {
        try {
            await deleteShipment(id);
            fetchData();
        } catch (error) {
            console.error('Error deleting shipment', error);
        }
    };

    const handleUpdate = async (id, index) => {
        try {
            await updateShipment(id, updateFormData[index].waybill, updateFormData[index].address, updateFormData[index].name, updateFormData[index].number);
            fetchData();
            setUpdateFormVisible((prev) => prev.map((val, i) => (i === index ? false : val)));
        } catch (error) {
            console.error('Error updating shipment', error);
        }
    };

    const toggleUpdateForm = (index) => {
        setUpdateFormVisible((prev) => prev.map((val, i) => (i === index ? !val : val)));
        if (!updateFormVisible[index]) {
            setUpdateFormData((prevData) => {
                const newData = [...prevData];
                newData[index] = {
                    waybill: shipments[index].waybill,
                    name: shipments[index].name,
                    address: shipments[index].address,
                    number: shipments[index].number,
                };
                return newData;
            });
        }
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        setUpdateFormData((prevData) => {
            const newData = [...prevData];
            newData[index] = {
                ...newData[index],
                [name]: value,
            };
            return newData;
        });
    };

    return (
        <div className="cards-container">
            {shipments.map((shipment, index) => (
                <div className="card" key={index}>
                    <img className='shipment-img' src={`http://127.0.0.1:8000${shipment.image_url}`} alt="shipment img" />

                    {updateFormVisible[index] ? (
                        <form className='update-form' onSubmit={() => handleUpdate(shipment.id, index)}>
                            <label>Name:</label>
                            <input type='text' name='name' value={updateFormData[index].name} onChange={(e) => handleInputChange(e, index)} />
                            <label>Phone:</label>
                            <input type='text' name='number' value={updateFormData[index].number} onChange={(e) => handleInputChange(e, index)} />
                            <label>Address:</label>
                            <input type='text' name='address' value={updateFormData[index].address} onChange={(e) => handleInputChange(e, index)} />
                            <label>Waybill:</label>
                            <input type='text' name='waybill' value={updateFormData[index].waybill} onChange={(e) => handleInputChange(e, index)} />
                            <div className='button-container'>
                                <button type='submit'>Save Changes</button>
                                <button className='delete-btn' type='button' onClick={() => toggleUpdateForm(index)}>Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <div className='shipment-details'>
                            <div className='shipment-name'>Name: {shipment.name}</div>
                            <div className='shipment-phone'>Phone: {shipment.number}</div>
                            <div className='shipment-address'>Address: {shipment.address}</div>
                            <div className='shipment-waybill'>Waybill: {shipment.waybill}</div>
                        </div>
                    )}

                    <div className='button-container'>
                        {!updateFormVisible[index] && (
                            <>
                                <button onClick={() => toggleUpdateForm(index)}>Edit</button>
                                <button className='delete-btn' onClick={() => handleDelete(shipment.id)}>Delete</button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Cards;
