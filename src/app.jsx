import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import FilterBar from './components/FilterBar/FilterBar';
import ProductGrid from './components/ProductGrid/ProductGrid';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Favourites from './components/Favourites/Favourites';
import Orders from './components/Orders/Orders';
import Checkout from './components/Checkout/Checkout';
import CheckoutSuccess from './components/CheckoutSuccess/CheckoutSuccess';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FavouritesProvider } from './contexts/FavouritesContext';
import { OrdersProvider } from './contexts/OrdersContext';
import './App.css';

const initialProducts = [
  {
    id: 1,
    name: 'MacBook Pro 16" M3 Max',
    category: 'Electronics',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
    description: 'Powerful laptop with M3 Max chip, 32GB RAM, 1TB SSD for professionals',
    rating: 4.8,
    reviews: 1247,
    brand: 'Apple'
  },
  {
    id: 2,
    name: 'Premium Cotton T-Shirt',
    category: 'Clothing',
    price: 29,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    description: 'Ultra-soft organic cotton t-shirt with perfect fit and comfort',
    rating: 4.6,
    reviews: 892,
    brand: 'ComfortWear'
  },
  {
    id: 3,
    name: 'The Great Gatsby',
    category: 'Books',
    price: 18,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    description: 'Classic American novel by F. Scott Fitzgerald - The Great Gatsby',
    rating: 4.4,
    reviews: 2156,
    brand: 'Scribner'
  },
  {
    id: 4,
    name: 'iPhone 15 Pro Max',
    category: 'Electronics',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop',
    description: 'Latest iPhone with titanium design, A17 Pro chip, and advanced camera system',
    rating: 4.7,
    reviews: 3421,
    brand: 'Apple'
  },
  {
    id: 5,
    name: 'Designer Slim Jeans',
    category: 'Clothing',
    price: 95,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    description: 'Premium slim-fit jeans with stretch comfort and modern styling',
    rating: 4.5,
    reviews: 756,
    brand: 'DenimCo'
  },
  {
    id: 6,
    name: 'Sapiens: A Brief History of Humankind',
    category: 'Books',
    price: 22,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
    description: 'Yuval Noah Harari\'s groundbreaking exploration of human history',
    rating: 4.6,
    reviews: 5432,
    brand: 'Harper'
  },
  {
    id: 7,
    name: 'Sony WH-1000XM5 Headphones',
    category: 'Electronics',
    price: 349,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    description: 'Industry-leading noise cancelling wireless headphones with 30hr battery',
    rating: 4.8,
    reviews: 2156,
    brand: 'Sony'
  },
  {
    id: 8,
    name: 'Nike Air Zoom Pegasus',
    category: 'Clothing',
    price: 130,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    description: 'Legendary running shoes with responsive Zoom Air cushioning',
    rating: 4.7,
    reviews: 1893,
    brand: 'Nike'
  },
  {
    id: 9,
    name: 'Atomic Habits',
    category: 'Books',
    price: 20,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    description: 'James Clear\'s guide to building good habits and breaking bad ones',
    rating: 4.9,
    reviews: 8765,
    brand: 'Avery'
  },
  {
    id: 10,
    name: 'Apple Watch Series 9',
    category: 'Electronics',
    price: 429,
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop',
    description: 'Advanced smartwatch with health monitoring and fitness tracking',
    rating: 4.6,
    reviews: 3241,
    brand: 'Apple'
  },
  {
    id: 11,
    name: 'Canada Goose Winter Jacket',
    category: 'Clothing',
    price: 895,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    description: 'Premium down-filled winter jacket for extreme cold weather',
    rating: 4.8,
    reviews: 654,
    brand: 'Canada Goose'
  },
  {
    id: 12,
    name: 'Deep Work',
    category: 'Books',
    price: 18,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
    description: 'Cal Newport\'s rules for focused success in a distracted world',
    rating: 4.5,
    reviews: 4321,
    brand: 'Grand Central'
  },
  {
    id: 13,
    name: 'Samsung 55" OLED TV',
    category: 'Electronics',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
    description: '4K OLED TV with quantum dot technology and smart features',
    rating: 4.7,
    reviews: 987,
    brand: 'Samsung'
  },
  {
    id: 14,
    name: 'Levi\'s 501 Original Jeans',
    category: 'Clothing',
    price: 79,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    description: 'Iconic straight-fit jeans that never go out of style',
    rating: 4.4,
    reviews: 2156,
    brand: 'Levi\'s'
  },
  {
    id: 15,
    name: 'The Psychology of Money',
    category: 'Books',
    price: 19,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    description: 'Morgan Housel\'s timeless lessons on wealth, greed, and happiness',
    rating: 4.7,
    reviews: 6789,
    brand: 'Harriman House'
  },
  {
    id: 16,
    name: 'Dell XPS 13 Laptop',
    category: 'Electronics',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    description: 'Ultra-portable laptop with InfinityEdge display and premium build',
    rating: 4.5,
    reviews: 1456,
    brand: 'Dell'
  },
  {
    id: 17,
    name: 'Adidas Ultraboost 22',
    category: 'Clothing',
    price: 190,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    description: 'Revolutionary running shoes with Boost technology and Primeknit upper',
    rating: 4.6,
    reviews: 2341,
    brand: 'Adidas'
  },
  {
    id: 18,
    name: 'Educated',
    category: 'Books',
    price: 17,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
    description: 'Tara Westover\'s powerful memoir of self-invention and belonging',
    rating: 4.8,
    reviews: 7654,
    brand: 'Random House'
  },
  {
    id: 19,
    name: 'Bose QuietComfort Earbuds',
    category: 'Electronics',
    price: 279,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop',
    description: 'World-class noise cancelling earbuds with spatial audio',
    rating: 4.7,
    reviews: 1876,
    brand: 'Bose'
  },
  {
    id: 20,
    name: 'Patagonia Fleece Jacket',
    category: 'Clothing',
    price: 149,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    description: 'Sustainable fleece jacket made from recycled polyester',
    rating: 4.6,
    reviews: 1234,
    brand: 'Patagonia'
  },
  {
    id: 21,
    name: 'The Midnight Library',
    category: 'Books',
    price: 16,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    description: 'Matt Haig\'s philosophical novel about life choices and infinite possibilities',
    rating: 4.5,
    reviews: 5432,
    brand: 'Canongate'
  },
  {
    id: 22,
    name: 'iPad Pro 12.9"',
    category: 'Electronics',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    description: 'Powerful tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil support',
    rating: 4.8,
    reviews: 2156,
    brand: 'Apple'
  },
  {
    id: 23,
    name: 'Ray-Ban Aviator Sunglasses',
    category: 'Clothing',
    price: 165,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    description: 'Classic aviator sunglasses with polarized lenses and metal frame',
    rating: 4.4,
    reviews: 987,
    brand: 'Ray-Ban'
  },
  {
    id: 24,
    name: 'Dune (2021 Edition)',
    category: 'Books',
    price: 25,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
    description: 'Frank Herbert\'s epic science fiction masterpiece - now a major motion picture',
    rating: 4.6,
    reviews: 3456,
    brand: 'Ace'
  }
];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = initialProducts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <>
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onSearchChange={setSearchTerm}
      />

      <main className="main-content">
        <div className="container">
          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            productCount={filteredAndSortedProducts.length}
          />

          <ProductGrid products={filteredAndSortedProducts} />
        </div>
      </main>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <FavouritesProvider>
        <OrdersProvider>
          <CartProvider>
            <Router>
              <div className="app">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/favourites"
                    element={
                      <ProtectedRoute>
                        <Favourites />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <ProtectedRoute>
                        <Orders />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/checkout/success" element={<CheckoutSuccess />} />
                </Routes>
              </div>
            </Router>
          </CartProvider>
        </OrdersProvider>
      </FavouritesProvider>
    </AuthProvider>
  );
}

export default App;
