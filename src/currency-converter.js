
import { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState(0);
  const [convertedValue, setConvertedValue] = useState(0);

  const apiKey = 'nvG2yYGX3ZaDyVt2q2Kc0Isf5FCUT0u2ecQ49uvc';
  const apiUrl = `https://api.currencyapi.com/v1/convert?apiKey=${apiKey}&from=USD&to=HTG`;

  const handleInputChange = (event) => {
    const inputValue = parseFloat(event.target.value);
    setInputValue(inputValue);

    // Make API request to get converted value
    fetch(`${apiUrl}&amount=${inputValue}`)
      .then((response) => response.json())
      .then((data) => {
        const convertedValue = data.amount;
        setConvertedValue(convertedValue);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <label htmlFor="inputValue">Enter amount in USD:</label>
      <input type="number" id="inputValue" value={inputValue} onChange={handleInputChange} />

      <p>The amount in Haitian Gourdes is: {convertedValue} HTG</p>
    </div>
  );
}
