import React, { useEffect, useState } from "react";
import Cards from "../../componenets/Cards";
import { getShipments } from "../../api";
import "./style.css";

function Shipments() {

    const [shipments, setShipments] = useState([])

    const fetchData = async () => {
        try {
            let response = await getShipments();
            setShipments(response.shipments);
        } catch (error) {
            console.error('failed:', error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='home-page-container'>
            <Cards shipments={shipments} fetchData={fetchData} />
        </div>
    );
}

export default Shipments
