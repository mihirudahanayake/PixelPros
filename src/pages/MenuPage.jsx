import React                         from "react";
import './Pages.css';
import FoodList                      from "../components/FoodList";


const MenuPage = () => {
  const userId = "demoUser123"; // Replace with actual user ID after auth

  return (
    <div className="menupage">
      <FoodList userId={userId} />
    </div>
  );
};

export default MenuPage;