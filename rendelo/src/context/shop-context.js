import { createContext, useState } from "react";
import GetAllProduct from "../hooks/getAllProduct";

export const ShopContext = createContext(null);

const getIndexes = () =>
{
  const allProducts = GetAllProduct().foodElements;
  allProducts.map(product => (
    <p key={product.id} value={product.id}>{product.name}</p>
  ))

  return allProducts
}

const getDefaultCart = () =>
{

  let cart = {};
  for (let i = 1; i <= 100; i++)
  {
    cart[i] = 0;
  }

  return cart;

};


export const ShopContextProvider = (props) =>
{
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const allProducts = GetAllProduct().foodElements;

  const getTotalCartAmount = () =>
  {
    allProducts.map(product => (
      <p key={product.id} value={product.id}>{product.name}</p>
    ))

    let totalAmount = 0;
    for (const item in cartItems)
    {

      if (cartItems[item] > 0)
      {

        let itemInfo = allProducts.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;

      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) =>
  {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) =>
  {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) =>
  {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () =>
  {
    setCartItems(getDefaultCart());
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
