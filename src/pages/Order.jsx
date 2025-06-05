import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate }   from 'react-router-dom';


import './Pages.css';

const Order = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedDish } = location.state || {};

    const [orderDetails, setOrderDetails] = useState({
        tableNumber: '',
        quantity: 1,
        paymentMethod: 'cash',
        specialInstructions: ''
    });

    useEffect(() => {
        if (!selectedDish) {
            navigate('/popular');
        }
    }, [selectedDish, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Order submitted:', {
            dish: selectedDish,
            ...orderDetails
        });
        alert('Order placed successfully!');
        navigate('/home');
    };

    if (!selectedDish) return null;

    return (
        <div className="page-center-wrapper">
            <div className="compact-order-container">
                <h2>Place Your Order</h2>

                <div className="compact-order-summary">
                    <img src={selectedDish.image} alt={selectedDish.name} className="compact-dish-image" />
                    <div className="compact-dish-info">
                        <h3>{selectedDish.name}</h3>
                        <div className="compact-price-time">
                            <span>{selectedDish.price}</span>
                            <span>⏱️ {selectedDish.time}</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="compact-order-form">
                    <div className="compact-form-row">
                        <div className="compact-form-group">
                            <label>Table #</label>
                            <input
                                type="number"
                                name="tableNumber"
                                value={orderDetails.tableNumber}
                                onChange={handleInputChange}
                                min="1"
                                required
                            />
                        </div>

                        <div className="compact-form-group">
                            <label>Qty</label>
                            <input
                                type="number"
                                name="quantity"
                                value={orderDetails.quantity}
                                onChange={handleInputChange}
                                min="1"
                                max="10"
                                required
                            />
                        </div>
                    </div>

                    <div className="compact-form-group">
                        <label>Payment</label>
                        <div className="compact-radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cash"
                                    checked={orderDetails.paymentMethod === 'cash'}
                                    onChange={handleInputChange}
                                />
                                Cash
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={orderDetails.paymentMethod === 'card'}
                                    onChange={handleInputChange}
                                />
                                Card
                            </label>
                        </div>
                    </div>

                    <div className="compact-form-group">
                        <label>Notes</label>
                        <textarea
                            name="specialInstructions"
                            value={orderDetails.specialInstructions}
                            onChange={handleInputChange}
                            rows="2"
                            placeholder="Special requests..."
                        />
                    </div>

                    <div className="compact-form-actions">
                        <button type="button" className="compact-cancel-btn" onClick={() => navigate(-1)}>
                            Back
                        </button>
                        <button type="submit" className="compact-submit-btn">
                            Confirm Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Order;