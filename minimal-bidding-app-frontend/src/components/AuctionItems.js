import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AuctionItems() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch items from backend
        axios.get('/api/items') // Replace with actual API endpoint
            .then(response => setItems(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="p-4">
            {items.map(item => (
                <div key={item.id} className="mb-4">
                    <h3 className="font-bold">{item.name}</h3>
                    <p>{item.description}</p>
                    {/* More item details */}
                </div>
            ))}
        </div>
    );
}

export default AuctionItems;
