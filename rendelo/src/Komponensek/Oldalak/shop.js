import React from 'react'
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./CSS/shop.css"
const Shop = () => {
  return (
    <div className="shop">
    <div className="shopTitle">
      <h1>Étlap</h1>
    </div>

    <div className="products">
      {PRODUCTS.map((product, index) => (
        <Product key={index} data={product} />
      ))}
    </div>
  </div>
  );
};

export default Shop
