import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const { user } = useContext(AuthContext);

    const fetchCart = async () => {
        try {
            const response = await api.get('cart/');
            setCart(response.data);
        } catch (error) {
            console.error("Failed to fetch cart");
        }
    };

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart(null);
        }
    }, [user]);

    const addToCart = async (menuItemId, quantity = 1) => {
        await api.post('cart/add_item/', { menu_item_id: menuItemId, quantity });
        await fetchCart();
    };

    const updateQuantity = async (itemId, quantity) => {
        await api.post('cart/update_item/', { item_id: itemId, quantity });
        await fetchCart();
    };

    const removeFromCart = async (itemId) => {
        await api.post('cart/remove_item/', { item_id: itemId });
        await fetchCart();
    };

    const checkout = async () => {
        const response = await api.post('cart/checkout/');
        await fetchCart();
        return response.data;
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, checkout }}>
            {children}
        </CartContext.Provider>
    );
};
