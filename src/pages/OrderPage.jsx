import React                        from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import './Pages.css';

const OrderPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { item } = state || {};
  const [paymentMethod, setPaymentMethod] = React.useState('cash');
  const [tableNumber, setTableNumber] = React.useState('');

  if (!item) {
    return (
      <div className="error-container">
        <h2>Item not found</h2>
        <button onClick={() => navigate('/')}>Back to Menu</button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      item,
      tableNumber,
      paymentMethod,
    });
  };

  return (
    <div className="order-page">
      
      <div className="order-content">
        <div className="item-container">
          <div className="item-image-container">
            <img src={item.image} alt={item.name} className="item-image" />
          </div>
          
          <div className="item-info">
            <h1 className="item-name">{item.name}</h1>
            <p className="item-description">{item.description}</p>
            <p className="item-price">LKR {item.price.toFixed(2)}</p>
          </div>
        </div>
        
        <form className="order-form" onSubmit={handleSubmit}>
          <h2>Place Your Order</h2>
          
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="tableNumber">Table #</label>
              <input
                type="text"
                id="tableNumber"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="table-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="quantity">Qty</label>
              <input 
                type="number" 
                id="quantity" 
                min="1" 
                defaultValue="1" 
                className="quantity-input"
              />
            </div>
          </div>
          
          <div className="form-group payment-group">
            <label>Payment</label>
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
                Cash
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                Card
              </label>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              className="notes-input" 
              placeholder="Special requests..."
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="secondary-button" onClick={() => navigate(-1)}>
              Back
            </button>
            
            <button type="submit" className="primary-button">
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;