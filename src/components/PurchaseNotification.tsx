import React, { useState, useEffect } from 'react';
import { randomNames } from '../data/testimonials';
import { products } from '../data/products';
import { Product } from '../types';

const PurchaseNotification: React.FC = () => {
  const [notifications, setNotifications] = useState<{name: string, product: Product}[]>([]);
  const [notificationSound] = useState(() => new Audio('https://cdn.freesound.org/previews/220/220156_4100852-lq.mp3'));
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Get random name
      const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
      
      // Get random product (prefer bestseller with 60% chance)
      let randomProduct: Product;
      if (Math.random() < 0.6) {
        const bestSellers = products.filter(p => p.bestSeller);
        randomProduct = bestSellers.length > 0 
          ? bestSellers[Math.floor(Math.random() * bestSellers.length)]
          : products[Math.floor(Math.random() * products.length)];
      } else {
        randomProduct = products[Math.floor(Math.random() * products.length)];
      }
      
      // Create new notification
      const newNotification = {
        name: randomName,
        product: randomProduct
      };
      
      // Play sound
      notificationSound.play().catch(err => console.log("Audio error:", err));
      
      // Add to notifications list
      setNotifications(prev => [newNotification, ...prev].slice(0, 3));
      
      // Remove notification after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n !== newNotification));
      }, 5000);
    }, 30000); // Every 30 seconds
    
    // Initial notification after 5 seconds
    const initialTimeout = setTimeout(() => {
      const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
      const bestSellers = products.filter(p => p.bestSeller);
      const randomProduct = bestSellers.length > 0 
        ? bestSellers[0]
        : products[0];
      
      const newNotification = {
        name: randomName,
        product: randomProduct
      };
      
      notificationSound.play().catch(err => console.log("Audio error:", err));
      setNotifications([newNotification]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n !== newNotification));
      }, 5000);
    }, 5000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [notificationSound]);
  
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
      {notifications.map((notification, index) => (
        <div 
          key={index}
          className="bg-white shadow-lg rounded-lg p-3 max-w-xs animate-slide-in"
          style={{
            animation: 'slideIn 0.5s ease-out forwards',
            opacity: 0,
            transform: 'translateX(100%)'
          }}
        >
          <p className="text-sm">
            <span className="font-semibold text-purple-800">{notification.name}</span> acabou de comprar{' '}
            <span className="font-medium">{notification.product.name}</span>!
          </p>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PurchaseNotification;