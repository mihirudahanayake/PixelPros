// import React, { useEffect, useState } from "react";
// import { db, collection, getDocs } from "../firebase/firebaseConfig";
// import FoodItem from "./FoodItem";
// import OrderModal from "./OrderModal";

// const FoodList = () => {
//   const [foodItems, setFoodItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedItem, setSelectedItem] = useState(null);

//   useEffect(() => {
//     const fetchFoodItems = async () => {
//       const querySnapshot = await getDocs(collection(db, "foodItems"));
//       const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setFoodItems(items);
//       setFilteredItems(items);
//     };
//     fetchFoodItems();
//   }, []);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     const filtered = foodItems.filter((item) => 
//       item.name.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setFilteredItems(filtered);
//   };

//   return (
//     <div className="p-6">
//       <input
//         type="text"
//         placeholder="Search food..."
//         className="border p-2 rounded w-full mb-4"
//         value={searchQuery}
//         onChange={handleSearch}
//       />
//       <div className="grid grid-cols-3 gap-4">
//         {filteredItems.map((item) => (
//           <FoodItem key={item.id} item={item} onOrder={setSelectedItem} />
//         ))}
//       </div>
//       {selectedItem && <OrderModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
//     </div>
//   );
// };

// export default FoodList;

import React, { useEffect, useState } from "react";
import { db, collection, getDocs }    from "../firebase/firebaseConfig";
import FoodItem                       from "./FoodItem";
import { useNavigate }                from "react-router-dom";
import { addToCart }                  from "../utils/cartUtils";
import './components.css';

const FoodList = ({ userId }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Dishes");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodItems = async () => {
      const querySnapshot = await getDocs(collection(db, "foodItems"));
      const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFoodItems(items);
      filterByCategory(items, "Dishes");
    };
    fetchFoodItems();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = foodItems.filter(
      (item) =>
        item.category === activeCategory &&
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const filterByCategory = (items, category) => {
    setActiveCategory(category);
    const filtered = items.filter((item) => item.category === category);
    setFilteredItems(filtered);
  };

  const handleOrderClick = (item) => {
    navigate(`/order/${item.id}`, { state: { item } });
  };

  return (
    <section className="FoodList">
    <h1>Food Menu</h1>
    <div className="food-list-container">
      <div className="size">
        <div className="category-tabs">
          {["Dishes", "Drinks", "Desserts"].map((category) => (
            <button
              key={category}
              className={`category-tab ${
                activeCategory === category ? "active" : "inactive"
              }`}
              onClick={() => filterByCategory(foodItems, category)}
            >
              {category}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder={`Search ${activeCategory}...`}
          className="search-input"
          value={searchQuery}
          onChange={handleSearch}
        />

        <div className="food-grid-3-col">
          {filteredItems.map((item) => (
            <FoodItem 
              key={item.id} 
              item={item} 
              onOrder={() => handleOrderClick(item)} 
              onAddToCart={(i) => addToCart(userId, i)}
            />
          ))}
        </div>
      </div>
    </div>
    </section>
  );
};

export default FoodList;