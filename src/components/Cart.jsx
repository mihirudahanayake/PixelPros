import React, { useEffect, useState } from "react";
import { db }                         from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc }     from "firebase/firestore";


const Cart = ({ userId }) => {
  const [items, setItems] = useState([]);

  const fetchCart = async () => {
    const cartRef = doc(db, "carts", userId);
    const snap = await getDoc(cartRef);
    if (snap.exists()) setItems(snap.data().items);
  };

  const removeItem = async (id) => {
    const cartRef = doc(db, "carts", userId);
    const updated = items.filter(item => item.id !== id);
    await updateDoc(cartRef, { items: updated });
    setItems(updated);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const cartRef = doc(db, "carts", userId);
    await updateDoc(cartRef, { items: [] });
    setItems([]);
    alert("Checked out successfully!");
  };

  useEffect(() => { fetchCart(); }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center border p-2 mb-2 rounded">
              <div>
                <p>{item.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p>LKR {item.price * item.quantity}</p>
                <button onClick={() => removeItem(item.id)} className="text-red-500 text-sm">Remove</button>
              </div>
            </div>
          ))}
          <p className="mt-4 font-bold">Total: LKR {total}</p>
          <button onClick={handleCheckout} className="bg-green-500 text-white px-4 py-2 rounded mt-2">Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
