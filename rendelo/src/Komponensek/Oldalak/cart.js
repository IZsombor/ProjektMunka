import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import "./CSS/cart.css";

const Cart = () => {
    const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cartTitle">
        <h1>Kosár tartalma:</h1>
      </div>
      <div className="cart">
      {PRODUCTS.map((product) => {
  if (cartItems[product.id] !== 0) {
    return <CartItem key={product.id} data={product} />;
  } else {
    return null;
  }
})}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Végösszeg: {totalAmount}Ft </p>
          <button onClick={() => navigate("/shop")}>Vásárlás folytatása</button>
          <button
            onClick={() => {
              checkout();
              navigate("");
            }}
          >
            {" "}
            Törlés{" "}
          </button>
        </div>
      ) : (
        <h1> A kosarad üres!</h1>
      )}
    </div>
  );
};

export default Cart;
