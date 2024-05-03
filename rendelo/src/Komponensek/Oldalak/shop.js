import React from 'react'
import { Product } from "./product";
import "./CSS/shop.css"
import GetAllProduct from '../../hooks/getAllProduct';

const Shop = () =>
{

  return (
    <div className="shop">

      <div className="shopTitle">
        <h1>Étlap</h1>
      </div>

      <div className="products">
        {GetAllProduct().foodElements.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );

};

export default Shop
