import React, { useState } from 'react';

function BidForm() {
    const [bidAmount, setBidAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit bid logic
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="border p-2 rounded mr-2"
                    placeholder="Bid Amount"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Place Bid</button>
            </form>
        </div>
    );
}

export default BidForm;
