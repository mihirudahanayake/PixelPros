// import React from "react";
// import Cart from "../components/Cart";

// const CartPage = () => {
//   const userId = "demoUser123"; // Replace with actual user ID

//   return (
//     <div className="container mx-auto p-6">
//       <Cart userId={userId} />
//     </div>
//   );
// };

// export default CartPage;

// import React from "react";
// import Cart from "../components/Cart";

// const CartPage = () => {
//   const userId = "demoUser123"; // Replace with actual user ID

//   return (
//     <div className="container mx-auto p-6">
//       <Cart userId={userId} />
//     </div>
//   );
// };

// export default CartPage;

import React, { useEffect, useState } from "react";
import { getCart, updateQuantity }    from "../services/cartService";
import './Pages.css';

const CartPage = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const items = await getCart(userId);
      setCartItems(items);
    };
    fetch();
  }, [userId]);

  const handleQuantityChange = async (id, change) => {
    await updateQuantity(userId, id, change);
    const updatedItems = await getCart(userId);
    setCartItems(updatedItems);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
<div className="cart-container">
  <h1 className="cart-title">Your Cart</h1>
  {cartItems.map(item => (
    <div key={item.id} className="cart-item">
      <div>
        <h2 className="item-name">{item.name}</h2>
        <p className="item-info">LKR {item.price} × {item.quantity}</p>
      </div>
      <div className="quantity-buttons">
        <button className="qty-button" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
        <button className="qty-button spaced" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
      </div>
    </div>
  ))}
  <div className="cart-total">Total: LKR {totalPrice}</div>
  <button className="checkout-btn">Checkout</button>
</div>

  );
};

export default CartPage;
