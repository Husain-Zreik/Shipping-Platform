import React from 'react'

function Cards({ shipments, setShipments }) {

    if (!shipments) {
        return <p>No shipments</p>;
    }

    return (
        <div className="cards-container">
            {shipments.map((shipments, index) => (
                <div className='card-comment-container' key={index}>
                    <div className="card" >
                        <img className='recipe-img' src={`http://127.0.0.1:8000${shipments.image_url}`} alt="recipe img" />

                        <div className='recipe-cuisine'>{shipments.cuisine}</div>
                        <div className='recipe-name'>{shipments.name}</div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default Cards