import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const addToCart = async (userId, item) => {
  const cartRef = doc(db, "carts", userId);
  const snap = await getDoc(cartRef);

  if (snap.exists()) {
    const cart = snap.data();
    const exists = cart.items.find(i => i.id === item.id);
    if (exists) {
      const updated = cart.items.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      await updateDoc(cartRef, { items: updated });
    } else {
      await updateDoc(cartRef, { items: [...cart.items, { ...item, quantity: 1 }] });
    }
  } else {
    await setDoc(cartRef, { items: [{ ...item, quantity: 1 }] });
  }
};
