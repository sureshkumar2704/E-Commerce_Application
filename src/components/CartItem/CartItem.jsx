import React from 'react';
import { Plus, Minus, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="item-details">
        <h4 className="item-name">{item.name}</h4>
        <p className="item-category">{item.category}</p>
        <div className="item-price">${item.price}</div>
      </div>

      <div className="item-controls">
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="quantity">{item.quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="item-total">
          ${(item.price * item.quantity).toFixed(2)}
        </div>

        <button className="remove-btn" onClick={handleRemove}>
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;