import { useState } from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
    const [number, setNumber] = useState(currentNOE);

    const handleInputChanged = (event) => {
        const value = Number(event.target.value);
        setNumber(value);

        if (isNaN(value) || value <= 0) {
            setErrorAlert('Please enter a valid number');
        } else if (value > 32) {
            setErrorAlert('Only a maximum of 32 events are allowed');
        } else {
            setErrorAlert('');
            setCurrentNOE(value);
        }
    };

    return (
        <div className="number-of-events">
            <label>
                Number of Events:
                <input
                    type="number"
                    value={number}
                    onChange={handleInputChanged}
                    data-testid="numberOfEventsInput"
                />
            </label>
        </div>
    );
};

export default NumberOfEvents;