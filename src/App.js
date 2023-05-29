import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items');
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async () => {
    if (newItem.trim() === '') return;

    try {
      await axios.post('/api/items', { name: newItem });
      fetchItems();
      setNewItem('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`/api/items/${itemId}`);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <h1>Lista de Mercado</h1>
      <div className="input-container">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Escreva o item"
        />
        <button onClick={addItem}>Adiciona</button>
      </div>
      <div className="item-line"></div>
      <ul className="item-list">
        {items.map((item, index) => (
          <li key={item.id}>
            <div className="item-container">
              <span className="item-text">{item.name}</span>
              <button className="delete-button" onClick={() => deleteItem(item.id)}>
                <AiOutlineDelete />
              </button>
            </div>
            {index !== items.length - 1 && <div className="item-line"></div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
