import React from 'react';
import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';
import { CartProvider } from './contexts/CartContext';
import './App.css';

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <div className="logo">Ecommerce Store</div>
            <CartSummary />
          </div>
        </header>
        <main>
          <ProductList />
        </main>
      </div>
    </CartProvider>
  );
};

export default App;