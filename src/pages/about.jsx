import React from 'react';
import './Pages.css';

const About = () => {
  return (
    <div className="about-page">
      <h1>About</h1>
      <p>
        Welcome to <strong>PixelPlate</strong>! We provide a smart and simple way for customers to place their food orders directly from inside the restaurant.
      </p>
      <p>
        Our digital ordering system helps you browse the menu, choose your favorite dishes, and send your order to the kitchen—all without waiting for a waiter. It saves time and improves your dining experience.
      </p>
      <p>
        With our system, you can:
      </p>
      <ul>
        <li>View all available dishes with pictures and prices</li>
        <li>Select and customize your meal</li>
        <li>Place your order directly from your table</li>
        <li>Call for assistance if needed</li>
      </ul>
      <p>
        Please note: This system is only for use inside the restaurant. We do not offer online or home delivery services at the moment.
      </p>
      <p>
        Thank you for using our ordering system. We hope it makes your dining experience easier and more enjoyable!
      </p>
    </div>
  );
};

export default About;
