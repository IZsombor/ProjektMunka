import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';

import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
  const { id, weight, name, price, productImage } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await axios.get('https://localhost:7208/foods');
      setFoods(response.data.obj);
    };

    fetchFoods();
  }, []);

  const handleAddToCart = async (id) => {
    addToCart(id);
  
    const food = foods.find(food => food.id === id);
    if (food) {
      const response = await axios.post('https://localhost:7208/foods', {
        Name: food.name,
        Price: food.price,
        Weight: food.weight
      });
  
      if (response.status === 201) {
        console.log('Sikeres étel hozzáadás!');
      }
    } else {
      console.log('Nem található étel az adott ID-val.');
    }
  };

  const cartItemCount = cartItems[id];

  return (
    <div className="product">
      <img src={productImage} alt="product"/>
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> {price} Ft</p>
        <p>
          {weight}
        </p>
      </div>
      <button className="addToCartBttn" onClick={() => handleAddToCart(id)}>
        Hozzáadva a kosárhoz{cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
