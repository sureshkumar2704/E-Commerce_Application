import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, MapPin } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders } from '../../contexts/OrdersContext';
import './Checkout.css';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order data
    const orderData = {
      items: items,
      total: getCartTotal(),
      shipping: formData,
      payment: {
        cardNumber: formData.cardNumber.replace(/\d(?=\d{4})/g, '*'),
        expiryDate: formData.expiryDate
      }
    };

    // Add order to user's order history
    addOrder(orderData);

    // Clear cart and redirect
    clearCart();
    navigate('/checkout/success');
  };

  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back to Shopping
          </button>
          <h1>Checkout</h1>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              {/* Shipping Information */}
              <div className="form-section">
                <div className="section-header">
                  <MapPin size={20} />
                  <h3>Shipping Information</h3>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="form-section">
                <div className="section-header">
                  <CreditCard size={20} />
                  <h3>Payment Information</h3>
                </div>

                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="checkout-btn"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay $${getCartTotal().toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-header">
              <Truck size={20} />
              <h3>Order Summary</h3>
            </div>

            <div className="order-items">
              {items.map(item => (
                <div key={item.id} className="order-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">Qty: {item.quantity} &nbsp;&nbsp; Price: ${item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-total">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="total-row final-total">
                <span>Total:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
