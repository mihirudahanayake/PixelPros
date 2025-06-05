import React from "react";

const OrderModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold">{item.name}</h2>
        <img src={item.image} alt={item.name} className="w-full h-40 object-cover mt-2 rounded-md" />
        <p className="mt-2 text-gray-600">{item.description}</p>
        <p className="mt-2 font-bold text-red-500">Rs {item.price}</p>
        <div className="mt-4 flex justify-between">
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Confirm Order</button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;