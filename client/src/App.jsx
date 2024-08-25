import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [inputData, setInputData] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        setError('');
        setResponse(null);

        try {
            const data = JSON.parse(inputData);
            
            if (!data.data || !Array.isArray(data.data)) {
                throw new Error('Invalid input format: "data" must be an array.');
            }
            const result = await axios.post('http://localhost:3000/bfhl', data);
            setResponse(result.data);
        } catch (err) {
            setError('Invalid JSON format or API call failed.');
            console.error('Error:', err);
        }
    };

    const handleSelectChange = (event) => {
        const { options } = event.target;
        const values = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
        setSelectedOptions(values);
    };

    const renderResponse = () => {
        if (!response) return null;

        const { numbers, alphabets, highest_lowercase_alphabet } = response;
        const filteredData = {};

        if (selectedOptions.includes('Numbers')) {
            filteredData.numbers = numbers;
        }
        if (selectedOptions.includes('Alphabets')) {
            filteredData.alphabets = alphabets;
        }
        if (selectedOptions.includes('Highest Lowercase Alphabet')) {
            filteredData.highest_lowercase_alphabet = highest_lowercase_alphabet;
        }

        return (
            <div className="response">
                <h2>Response</h2>
                <pre>{JSON.stringify(filteredData, null, 2)}</pre>
            </div>
        );
    };

    return (
        <div className="app">
            <h1>Data Processor App</h1>
            <textarea
                className="input"
                placeholder='Enter JSON data here...for example,
                {
    "data": ["M", "1", "334", "4", "B", "Z", "a"],
    "full_name": "john_doe",
    "dob": "17091999",
    "email": "john@xyz.com",
    "roll_number": "ABCD123"
}
'
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
            />
            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            {error && <div className="error">{error}</div>}
            <div className="dropdown-container">
                <select
                    className="dropdown"
                    multiple
                    onChange={handleSelectChange}
                    value={selectedOptions}
                >
                    <option value="Alphabets">Alphabets</option>
                    <option value="Numbers">Numbers</option>
                    <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
                </select>
            </div>
            {renderResponse()}
        </div>
    );
};

export default App;
