import React, { useContext } from "react";
import axios from 'axios';
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) =>
{
  const { id, name, price } = props.data;
  const imageSrc = props.data.picture ? `data:image/jpeg;base64,${props.data.picture}` : "";
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);


  const handleUpdateCartItemCount = async (newCount) =>
  {
    try
    {
      await axios.put(`https://localhost:7208/foods/${id}`, { count: newCount });
      updateCartItemCount(newCount, id);
    } catch (error)
    {
      console.error(`Hiba a kosárban lévő termékek számának frissítésekor azonosítóval ${id}`, error);
    }
  };

  return (
    <div className="cartItem">
      <img src={imageSrc} alt="true" />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> Ár: {price} Ft</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
            onChange={(e) => handleUpdateCartItemCount(Number(e.target.value))}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};

