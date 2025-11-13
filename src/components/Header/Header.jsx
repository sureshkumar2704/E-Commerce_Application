import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Heart, LogOut, Package } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = ({ onCartClick, onSearchChange }) => {
  const { getCartItemsCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>🛍️ ShopEasy</h1>
          <span>Your Favorite E-Commerce</span>
        </Link>

        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <Link to="/favourites" className="nav-link">
                <Heart size={20} />
                <span>Favourites</span>
              </Link>
              <Link to="/orders" className="nav-link">
                <Package size={20} />
                <span>Orders</span>
              </Link>
              <div className="user-menu">
                <User size={20} />
                <span>{user.name}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link register-link">Register</Link>
            </div>
          )}

          <button className="cart-button" onClick={onCartClick}>
            <ShoppingCart size={24} />
            <span className="cart-count">{getCartItemsCount()}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;