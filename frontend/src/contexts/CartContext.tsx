import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartContextType, CartItem, Product } from '../types';
import { getCartItems, addCartItem, removeCartItem } from '../services/api';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId] = useState(() => {
    // Generate or retrieve a cart ID (using session storage)
    const storedCartId = sessionStorage.getItem('cartId');
    if (storedCartId) return storedCartId;
    
    const newCartId = 'cart-' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('cartId', newCartId);
    return newCartId;
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems(cartId);
        setCartItems(items);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, [cartId]);

  const addToCart = async (product: Product, quantity: number = 1) => {
    try {
      const updatedItem = await addCartItem(cartId, product.id, quantity);
      
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.product.id === product.id);
        if (existingItem) {
          return prevItems.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prevItems, { ...updatedItem, product }];
        }
      });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await removeCartItem(cartId, productId);
      setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    try {
      await addCartItem(cartId, productId, quantity);
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Failed to update item quantity:', error);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};