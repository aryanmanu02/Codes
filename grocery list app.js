import React, { useState } from 'react';
import './App.css';

function App() {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const addItem = () => {
        if (inputValue.trim() !== '') {
            setItems([...items, { text: inputValue, purchased: false }]);
            setInputValue(''); // Clear input after adding
        }
    };

    const togglePurchased = (index) => {
        const newItems = [...items];
        newItems[index].purchased = !newItems[index].purchased;
        setItems(newItems);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    return (
        <div className="App">
            <h1>Grocery List</h1>
            <div className="input-container">
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder="Add a grocery item" 
                />
                <button onClick={addItem}>Add</button>
            </div>
            <ul className="grocery-list">
                {items.map((item, index) => (
                    <li key={index} className={item.purchased ? 'purchased' : ''}>
                        <span onClick={() => togglePurchased(index)}>{item.text}</span>
                        <button onClick={() => removeItem(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

// App.css
// .App {
//   text-align: center;
//   max-width: 600px;
//   margin: 0 auto;
//   padding: 20px;
// }

// .input-container {
//   margin-bottom: 20px;
// }

// input {
//   padding: 10px;
//   width: 70%;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// }

// button {
//   padding: 10px 15px;
//   margin-left: 10px;
//   background-color: #28a745;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// }

// button:hover {
//   background-color: #218838;
// }

// .grocery-list {
//   list-style: none;
//   padding: 0;
// }

// .grocery-list li {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 10px;
//   border-bottom: 1px solid #ccc;
// }

// .purchased {
//   text-decoration: line-through;
//   color: #6c757d;
// }
