import React, { useContext } from "react";
import axios from 'axios';
import { ShopContext } from "../../context/shop-context";

export const addToCart = async (name, price, weight) => {
  let isExisting = false;
  const result = await axios.get('https://localhost:7208/foods/products/');
  if (result.data.length === 0) {
    const order = {name: name, price: price, weight: weight};
    axios.post('https://localhost:7208/foods', order);
  }
  else{
    result.data.forEach((orderItem) => {
      if(name === orderItem.name) {
        const order ={
          name: name,
          price: price,
          weight: weight
        };
        axios.put(`https://localhost:7208/foods/${orderItem.id}`, order);
      }
    });
    if (isExisting === false) {
      const order = {
        name: name,
        price: price,
        weight: weight,
      };
      axios.post('https://localhost:7208/foods', order);
    }
  }
};

export const Product = (props) => {
  const { id, weight, name, price, productImage } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

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
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Hozzáadva a kosárhoz{cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
