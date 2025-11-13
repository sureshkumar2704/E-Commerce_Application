import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavourites } from '../../contexts/FavouritesContext';
import ProductCard from '../ProductCard/ProductCard';
import './Favourites.css';

const Favourites = () => {
  const { favourites } = useFavourites();
  const navigate = useNavigate();

  return (
    <div className="favourites-page">
      <div className="container">
        <div className="favourites-header">
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back to Shopping
          </button>
          <div className="header-content">
            <h1>My Favourites</h1>
            <span className="favourites-count">({favourites.length} items)</span>
          </div>
        </div>

        {favourites.length === 0 ? (
          <div className="empty-favourites">
            <h3>No favourites yet</h3>
            <p>Start adding products to your favourites!</p>
          </div>
        ) : (
          <div className="favourites-grid">
            {favourites.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
