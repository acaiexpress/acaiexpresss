import React, { useState, useEffect } from 'react';
import LocationSelector from './components/LocationSelector';
import Header from './components/Header';
import StoreInfo from './components/StoreInfo';
import Menu from './components/Menu';
import Testimonials from './components/Testimonials';
import AddonsSelector from './components/AddonsSelector';
import OrderForm from './components/OrderForm';
import PurchaseNotification from './components/PurchaseNotification';
import Footer from './components/Footer';
import { LocationProvider } from './context/LocationContext';
import { CartProvider } from './context/CartContext';
import { Product } from './types';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showLocationSelector, setShowLocationSelector] = useState(true);

  useEffect(() => {
    // Force the location selector to show on initial load
    setShowLocationSelector(true);
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseAddons = () => {
    setSelectedProduct(null);
  };

  return (
    <LocationProvider>
      <CartProvider>
        <div className="min-h-screen bg-purple-50 text-gray-800 font-sans">
          {showLocationSelector && (
            <LocationSelector onClose={() => setShowLocationSelector(false)} />
          )}
          
          <Header />
          
          <main className="container mx-auto px-4 pb-16">
            <StoreInfo />
            <Menu onSelectProduct={handleProductSelect} />
            <Testimonials />
            <OrderForm />
          </main>
          
          <Footer />
          
          {selectedProduct && (
            <AddonsSelector 
              product={selectedProduct} 
              onClose={handleCloseAddons} 
            />
          )}
          
          <PurchaseNotification />
        </div>
      </CartProvider>
    </LocationProvider>
  );
}

export default App;