import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import CartModal from './CartModal';
import './CartSummary.css';

const CartSummary: React.FC = () => {
  const { getCartItemsCount, getCartTotal } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <div className="cart-summary" onClick={() => setIsCartOpen(true)}>
        <span className="cart-icon">🛒</span>
        <span className="cart-count">{getCartItemsCount()}</span>
        <span className="cart-total">${getCartTotal().toFixed(2)}</span>
      </div>
      
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default CartSummary;