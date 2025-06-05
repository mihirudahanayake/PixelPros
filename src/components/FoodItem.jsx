import React, { useState } from 'react';
import './components.css';

const FoodItem = ({ item, onOrder, onAddToCart }) => {
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddToCart = (item) => {
    onAddToCart(item);
    setSuccessMessage('Added to cart successfully!');
    setTimeout(() => setSuccessMessage(''), 2000); // Hide after 2 seconds
  };

  return (
    <div className="food-item">
      <div className="food-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="food-item-content">
        <h3>{item.name}</h3>
        <p>{item.category}</p>
        <p className="price">LKR {item.price}</p>
        
        {successMessage && (
          <p className="success">{successMessage}</p>
        )}

        <div className="ordercart">
          <button onClick={() => onOrder(item)}>
            Order
          </button>
          <button onClick={() => handleAddToCart(item)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
