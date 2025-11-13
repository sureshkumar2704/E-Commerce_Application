import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load orders from localStorage when user changes
    if (user) {
      const storedOrders = localStorage.getItem(`orders_${user.email}`);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        setOrders([]);
      }
    } else {
      setOrders([]);
    }
  }, [user]);

  const addOrder = (orderData) => {
    if (!user) return;

    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...orderData
    };

    const newOrders = [...orders, newOrder];
    setOrders(newOrders);
    localStorage.setItem(`orders_${user.email}`, JSON.stringify(newOrders));
  };

  const value = {
    orders,
    addOrder
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};
