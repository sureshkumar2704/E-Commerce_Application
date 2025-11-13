import React from 'react';
import { Package, Calendar, DollarSign, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../contexts/OrdersContext';
import './Orders.css';

const Orders = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="orders-page">
      <div className="container">
        <div className="orders-header">
          <Package size={32} className="orders-icon" />
          <h1>My Orders</h1>
          <span className="orders-count">({orders.length} orders)</span>
        </div>

        <div className="orders-content">

        {orders.length === 0 ? (
          <div className="empty-orders">
            <Package size={64} className="empty-orders-icon" />
            <h3>No orders yet</h3>
            <p>Your order history will appear here after your first purchase.</p>
            <button
              onClick={() => navigate('/')}
              className="home-btn"
            >
              <Home size={16} />
              Go to Home
            </button>
          </div>
        ) : (
          <>
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <div className="order-id">
                        <span className="label">Order ID:</span>
                        <span className="value">#{order.id}</span>
                      </div>
                      <div className="order-date">
                        <Calendar size={16} />
                        <span>{formatDate(order.date)}</span>
                      </div>
                    </div>
                    <div className="order-status">
                      <span className="status-badge">Delivered</span>
                    </div>
                  </div>

                  <div className="order-items">
                    {order.items.map(item => (
                      <div key={item.id} className="order-item">
                        <div className="item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="item-details">
                          <h4 className="item-nam">{item.name}</h4>
                          <p className="item-description">{item.description}</p>
                          <div className="item-meta">
                            <span className="item-quantit">Qty: {item.quantity}</span>
                            <span className="item-pric">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <div className="order-total">
                      <DollarSign size={16} />
                      <span className="total-label">Total:</span>
                      <span className="total-amount">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="orders-actions">
              <button
                onClick={() => navigate('/')}
                className="home-btn"
              >
                <Home size={16} />
                Go to Home
              </button>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
