import { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        console.log("allLocations:", allLocations);
        setSuggestions(allLocations);
    }, [allLocations]);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations
            ? allLocations.filter(location =>
                location.toUpperCase().includes(value.toUpperCase())
            )
            : [];

        console.log("Filtered Locations:", filteredLocations);

        setQuery(value);
        setSuggestions(filteredLocations);
    };

    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false);
        setCurrentCity(value);
    };

    return (
        <div id="city-search">
            <input
                type="text"
                className="city"
                placeholder="Search for a city"
                value={query}
                onFocus={() => setShowSuggestions(true)}
                onChange={handleInputChanged}
            />
            {showSuggestions && (
                <ul className="suggestions">
                    {suggestions.map(suggestion => (
                        <li key={suggestion} onClick={handleItemClicked}>
                            {suggestion}
                        </li>
                    ))}
                    <li key="See all cities" onClick={handleItemClicked}>
                        <b>See all cities</b>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default CitySearch;