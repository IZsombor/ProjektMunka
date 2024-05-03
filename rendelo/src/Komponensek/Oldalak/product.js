import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';

import { ShopContext } from "../../context/shop-context"

export const Product = (props) =>
{
  const { id, weight, name, price } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const imageSrc = props.data.picture ? `data:image/jpeg;base64,${props.data.picture}` : "";

  const [foods, setFoods] = useState([]);

  useEffect(() =>
  {
    const fetchFoods = async () =>
    {
      const response = await axios.get('https://localhost:7208/foods');
      setFoods(response.data.obj);
    };

    fetchFoods();
  }, []);

  const handleAddToCart = async (id) =>
  {
    addToCart(id);

    const food = foods.find(food => food.id === id);
  
    if (food)
    {
      const response = await axios.get('https://localhost:7208/foods', {
        id: food.id,
        name: food.name,
        price: food.price,
        weight: food.weight
      });

      if (response.status === 200)
      {
        console.log(`Sikeres étel hozzáadás!`);

      }
    } else
    {
      console.log('Nem található étel az adott ID-val.');
    }
  };

  const cartItemCount = cartItems[id];

  return (
    <div className="product">
      <img src={imageSrc} alt="product" />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> {price} Ft</p>
        <p>
          {weight} Dkg
        </p>
      </div>
      <button className="addToCartBttn" onClick={() => handleAddToCart(id)}>
        Hozzáadás a kosárhoz{cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
