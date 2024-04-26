import React, { useContext } from "react";

import { ShopContext } from "../../context/shop-context";



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
