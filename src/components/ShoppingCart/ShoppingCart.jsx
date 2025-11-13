import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import CartItem from '../CartItem/CartItem';
import './ShoppingCart.css';

const ShoppingCart = ({ isOpen, onClose }) => {
  const { items, getCartTotal, clearCart, getCartItemsCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Please login to proceed to checkout');
      navigate('/login');
      onClose();
      return;
    }
    navigate('/checkout');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={handleOverlayClick}>
      <div className="cart-sidebar">
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={24} />
            <span>Shopping Cart ({getCartItemsCount()})</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={64} className="empty-cart-icon" />
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="cart-total">
                    <span className="cart-total-label">Subtotal:</span>
                    <span className="cart-total-amount">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="cart-actions">
                    <button className="clear-cart-btn" onClick={clearCart}>
                      <Trash2 size={18} />
                      Clear Cart
                    </button>
                    <button className="checkout-btn" onClick={handleCheckout}>
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;