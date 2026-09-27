import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ReactApp } from './ReactApp';
import './styles/app.css';

// Purge any stale session state or cached data
try {
  sessionStorage.clear();
  if ('caches' in window) {
    caches.keys().then((names) => {
      names.forEach((name) => caches.delete(name));
    });
  }
} catch (e) {}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <ReactApp />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
