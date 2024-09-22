import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [jsonInput, setJsonInput] = useState(''); // State for input JSON
  const [response, setResponse] = useState(null); // State for API response
  const [selectedOptions, setSelectedOptions] = useState([]); // State for selected options

  // Function to handle form submission and API call
  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput); // Parsing JSON input
      const res = await axios.post('https://sittu01.pythonanywhere.com/bfhl', parsedInput);
      setResponse(res.data); // Setting the response in state
    } catch (error) {
      console.error('Error submitting JSON:', error); // Handling errors
    }
  };

  // Function to handle checkbox selection
  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]); // Add selected option
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value)); // Remove deselected option
    }
  };

  // Function to render filtered response based on selected options
  const renderResponse = () => {
    if (!response) return null;
    const filteredResponse = selectedOptions.reduce((acc, option) => {
      if (response[option]) acc[option] = response[option]; // Only add selected options
      return acc;
    }, {});
    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>; // Pretty print the JSON
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Interface</h1>
      
      {/* JSON Input Field */}
      <textarea
        style={{ width: '100%', height: '100px', marginBottom: '20px' }}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON"
      />

      {/* Submit Button */}
      <button onClick={handleSubmit} style={{ marginBottom: '20px' }}>Submit</button>

      {/* Option Checkboxes */}
      <div>
        <label>
          <input
            type="checkbox"
            value="numbers"
            onChange={handleOptionChange}
          />
          Numbers
        </label>
        <label style={{ marginLeft: '20px' }}>
          <input
            type="checkbox"
            value="alphabets"
            onChange={handleOptionChange}
          />
          Alphabets
        </label>
        <label style={{ marginLeft: '20px' }}>
          <input
            type="checkbox"
            value="highest_lowercase_alphabet"
            onChange={handleOptionChange}
          />
          Highest Lowercase Alphabet
        </label>
      </div>

      {/* Render the filtered response */}
      <div style={{ marginTop: '20px' }}>
        {renderResponse()}
      </div>
    </div>
  );
};

export default App;
