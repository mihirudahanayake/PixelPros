import React           from 'react';
import './Pages.css';
import { useNavigate } from 'react-router-dom';
import dish1           from '../images/dish1.png';
import dish2           from '../images/dish2.png';
import dish3           from '../images/dish3.png';
import dish4           from '../images/dish4.png';
import dish5           from '../images/dish5.png';
import dish6           from '../images/dish6.png';

const dishes = [
    { id: 1, name: "dish1", image: dish1, rating: 3, time: "20 Mints", price: "LKR 1200" },
    { id: 2, name: "dish2", image: dish2, rating: 4, time: "20 Mints", price: "LKR 1200" },
    { id: 3, name: "dish3", image: dish3, rating: 5, time: "20 Mints", price: "LKR 1200" },
    { id: 4, name: "dish4", image: dish4, rating: 3, time: "30 Mints", price: "LKR 1200" },
    { id: 5, name: "dish5", image: dish5, rating: 3, time: "20 Mints", price: "LKR 1200" },
    { id: 6, name: "dish6", image: dish6, rating: 3, time: "20 Mints", price: "LKR 1200" },
];

const PopularDish = () => {
    const navigate = useNavigate();

    const handleOrderClick = (dish) => {
        navigate('/order', { 
            state: { 
                selectedDish: dish 
            } 
        });
    };
    return (
        <section className="popular-dish">
            <h2>POPULAR DISH</h2>
            <div className="dish-container">
                {dishes.map((dish, index) => (
                    <div key={dish.id} className={`dish-card ${index === 1 ? "active" : ""}`}>
                        <img src={dish.image} alt={dish.name} />
                        <div className="dish-info">
                            <h3>{dish.name}</h3>
                            <div className="order-info">
                                <p>⏳ {dish.time}</p>
                                <div className="rating">
                                    {"★".repeat(dish.rating)}
                                    {"☆".repeat(5 - dish.rating)}
                                </div>
                                <p>{dish.price}</p>
                            </div>
                            <button className="order-btn" onClick={() => handleOrderClick(dish)}>Order</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};


export default PopularDish;