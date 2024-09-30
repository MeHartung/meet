import React, { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE }) => {
    const [eventCount, setEventCount] = useState(32);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setEventCount(value);
        setCurrentNOE(value);
    };

    return (
        <div className="number-of-events">
            <label htmlFor="number-of-events">Number of Events: </label>
            <input
                type="number"
                id="number-of-events"
                value={eventCount}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default NumberOfEvents;