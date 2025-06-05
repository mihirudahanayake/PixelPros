import { db } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export const addToCart = async (userId, item) => {
  const cartRef = doc(db, "carts", userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const cart = cartSnap.data();
    const existingItemIndex = cart.items.findIndex(i => i.id === item.id);

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += 1;
    } else {
      cart.items.push({ ...item, quantity: 1 });
    }
    await updateDoc(cartRef, { items: cart.items });
  } else {
    await setDoc(cartRef, { items: [{ ...item, quantity: 1 }] });
  }
};

export const getCart = async (userId) => {
  const cartRef = doc(db, "carts", userId);
  const cartSnap = await getDoc(cartRef);
  return cartSnap.exists() ? cartSnap.data().items : [];
};

export const updateQuantity = async (userId, itemId, change) => {
  const cartRef = doc(db, "carts", userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const items = cartSnap.data().items.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + change };
      }
      return item;
    }).filter(item => item.quantity > 0);
    await updateDoc(cartRef, { items });
  }
};
