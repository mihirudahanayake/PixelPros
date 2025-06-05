import React                              from "react";

import { addFoodItem, addFoodItemWithID } from "./FoodItemServices";

const FoodMenu = () => {
  // Sample food data
  const foodItem = {
    name: "Angel Food Cake",
    image: "https://example.com/sambola.jpg",
    category: "Desserts",
    description: "A delicious Sri Lankan dishes.",
    price: 250,
  };

  return (
    <div>
      <h1>Food Services</h1>
      <button onClick={() => addFoodItem(foodItem)}>Add Food (Auto ID)</button>
      <button onClick={() => addFoodItemWithID(foodItem)}>Add Food (Custom ID)</button>
    </div>
  );
};

export default FoodMenu;