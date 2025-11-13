# E-Commerce Application

A modern, responsive e-commerce web application built with React, featuring a beautiful glassmorphism design and comprehensive shopping functionality.

## 🚀 Features

### Core Functionality
- **Product Browsing**: Browse through 20+ realistic products with detailed information
- **Advanced Filtering**: Filter products by category, price range, and search terms
- **Shopping Cart**: Add, remove, and manage cart items with quantity controls
- **User Authentication**: Secure login and registration system
- **Favourites System**: Save favorite products for later
- **Order History**: View past orders and order details
- **Secure Checkout**: Complete checkout process with form validation

### Design & UX
- **Glassmorphism Design**: Modern glass-like UI with backdrop blur effects
- **Mobile Responsive**: Fully responsive design for all device sizes
- **Micro-interactions**: Smooth animations and hover effects
- **Loading States**: Visual feedback for async operations
- **Product Ratings**: Star ratings display for products

### Technical Features
- **State Management**: Context API for global state management
- **Routing**: React Router for seamless navigation
- **Form Validation**: Client-side validation for all forms
- **Image Optimization**: Proper image sizing and loading
- **Performance**: Optimized rendering and smooth interactions

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with Hooks
- **Build Tool**: Vite for fast development and building
- **Styling**: CSS3 with custom properties and glassmorphism effects
- **Routing**: React Router DOM
- **Icons**: Lucide React for consistent iconography
- **State Management**: React Context API
- **Development**: ESLint for code quality

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerce-application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5175` to view the application

## 🎯 Usage

### For Customers
1. **Browse Products**: Explore the product catalog on the home page
2. **Filter & Search**: Use the filter bar to find specific products
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Manage Cart**: View and modify cart items in the shopping cart
5. **Save Favorites**: Login and add products to favorites
6. **Checkout**: Complete the secure checkout process
7. **View Orders**: Access order history after login

### For Developers
- **Component Structure**: Modular React components
- **Context Providers**: Centralized state management
- **CSS Variables**: Consistent theming with CSS custom properties
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── CartItem/        # Individual cart item component
│   ├── Checkout/        # Checkout page and form
│   ├── CheckoutSuccess/ # Order success page
│   ├── Favourites/      # Favourites page
│   ├── FilterBar/       # Product filtering component
│   ├── Header/          # Navigation header
│   ├── Login/           # Login page
│   ├── Orders/          # Order history page
│   ├── ProductCard/     # Product display card
│   ├── ProductGrid/     # Product listing grid
│   ├── Register/        # Registration page
│   └── ShoppingCart/    # Shopping cart sidebar
├── contexts/            # Context providers
│   ├── AuthContext.jsx      # User authentication
│   ├── CartContext.jsx      # Shopping cart state
│   ├── FavouritesContext.jsx # Favorites management
│   └── OrdersContext.jsx     # Order history
├── assets/              # Static assets
├── app.css             # Global styles and variables
├── app.jsx             # Main application component
├── index.css           # Additional global styles
└── main.jsx            # Application entry point
```

## 🎨 Design System

### Glassmorphism Variables
- `--glass-bg`: Semi-transparent background with blur
- `--glass-border`: Subtle border for glass elements
- `--primary-gradient`: Main gradient background
- `--surface-primary`: Primary surface color
- `--text-primary`: Primary text color

### Color Palette
- Primary: Gradient from purple to blue
- Accent: Gold/yellow for highlights
- Text: Dark for readability on glass backgrounds
- Glass: Semi-transparent with backdrop blur

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features Implementation

### Phase 1: Product Data Expansion ✅
- Added 20+ realistic products with images and details
- Implemented ratings and reviews system
- Enhanced product descriptions

### Phase 2: Glassmorphism Design ✅
- Applied glassmorphism to all major components
- Consistent backdrop blur and transparency effects
- Modern color schemes and gradients

### Phase 3: Component Enhancements ✅
- Added loading states for better UX
- Implemented micro-interactions and animations
- Improved mobile responsiveness
- Added product ratings display

### Phase 4: Testing & Verification ✅
- Verified functionality across all pages
- Ensured consistent glassmorphism styling
- Tested mobile responsiveness
- Confirmed image loading performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support or questions, please open an issue in the repository.

## 🔄 Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] Product reviews and ratings system
- [ ] Wishlist functionality
- [ ] Admin dashboard for product management
- [ ] Order tracking system
- [ ] Email notifications
- [ ] Dark mode toggle
- [ ] Multi-language support

---

Built with ❤️ using React and modern web technologies.
