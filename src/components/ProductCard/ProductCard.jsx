import React, { useState } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useFavourites } from '../../contexts/FavouritesContext';
import { useAuth } from '../../contexts/AuthContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItem, items } = useCart();
  const { addToFavourites, removeFromFavourites, isFavourite } = useFavourites();
  const { isAuthenticated } = useAuth();
  const [isAdding, setIsAdding] = useState(false);

  const isInCart = items.some(item => item.id === product.id);
  const isLiked = isFavourite(product.id);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addItem(product);

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsAdding(false);
  };

  const handleToggleFavourite = () => {
    if (!isAuthenticated) {
      alert('Please login to add favourites');
      return;
    }

    if (isLiked) {
      removeFromFavourites(product.id);
    } else {
      addToFavourites(product);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <button
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleToggleFavourite}
        >
          <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
        <div className="product-category">{product.category}</div>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                className={i < Math.floor(product.rating) ? 'filled' : ''}
              />
            ))}
          </div>
          <span className="rating-text">({product.rating})</span>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-price">${product.price}</div>
      </div>

      <button
        className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''} ${isAdding ? 'adding' : ''}`}
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        <ShoppingCart size={18} />
        {isAdding ? 'Adding...' : isInCart ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;