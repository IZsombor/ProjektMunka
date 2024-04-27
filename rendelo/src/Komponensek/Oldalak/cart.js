import React, { useContext, useEffect } from "react";
import axios from 'axios';
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import "./CSS/cart.css";

const Cart = () => {
    const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    const navigate = useNavigate();

    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7208/foods/${id}`);
        } finally {
            checkout();
            navigate("");
        }
    };

    
    useEffect(() => {
        const fetchProduct = async (id) => {
            try {
                const response = await axios.get(`https://localhost:7208/foods/${id}`);
                console.log(response.data);
            } catch (error) {
                console.error(`Termék azonosítóval történő lekérdezési hiba. ${id}`, error);
            }
        };

        for (const id in cartItems) {
            fetchProduct(id);
        }
    }, [cartItems]);

    return (
        <div className="cart">
            <div className="cartTitle">
                <h1>Kosár tartalma:</h1>
            </div>
            <div className="cart">
                {PRODUCTS.map((product) => {
                    if (cartItems[product.id] !== 0) {
                        return (
                            <CartItem 
                                key={product.id} 
                                data={product} 
                                onDelete={() => handleDelete(product.id)}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>

            {totalAmount > 0 ? (
                <div className="checkout">
                    <p> Végösszeg: {totalAmount}Ft </p>
                    <button onClick={() => navigate("/shop")}>Vásárlás folytatása</button>
                    <button onClick={() => handleDelete()}> Törlés </button>
                </div>
            ) : (
                <h1> A kosarad üres!</h1>
            )}
        </div>
    );
};

export default Cart;

