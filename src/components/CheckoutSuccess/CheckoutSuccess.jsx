import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';
import './CheckoutSuccess.css';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout-success">
      <div className="success-container">
        <CheckCircle size={80} className="success-icon" />
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your order has been confirmed.</p>

        <div className="success-actions">
          <button
            onClick={() => navigate('/')}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/orders')}
            className="view-orders-btn"
          >
            <Package size={16} />
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
