import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db }                              from "../firebase/firebaseConfig";


// ✅ Function to add food item with auto-generated ID
export const addFoodItem = async (foodData) => {
  try {
    await addDoc(collection(db, "foodItems"), foodData);
    console.log("✅ Food item added successfully!");
  } catch (error) {
    console.error("❌ Error adding food item:", error);
  }
};

// ✅ Function to add food item with custom ID (using name)
export const addFoodItemWithID = async (foodData) => {
  try {
    const foodRef = doc(db, "foodItems", foodData.name);
    await setDoc(foodRef, foodData);
    console.log("✅ Food item added with custom ID!");
  } catch (error) {
    console.error("❌ Error adding food item:", error);
  }
};
