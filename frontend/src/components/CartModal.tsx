import React from 'react';
import { useCart } from '../contexts/CartContext';
import './CartSummary.css';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="cart-modal open">
        <div className="cart-modal-header">
          <h2 className="cart-modal-title">Your Cart</h2>
          <button className="cart-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="cart-modal-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              Your cart is empty
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.product.imageUrl} 
                  alt={item.product.name}
                  className="cart-item-image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.product.name}</h3>
                  <p className="cart-item-price">${(item.product.price * item.quantity).toFixed(2)}</p>
                  <div className="cart-item-quantity">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >-</button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <button 
                    className="remove-item-btn"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="cart-modal-footer">
            <div className="cart-total-amount">
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;