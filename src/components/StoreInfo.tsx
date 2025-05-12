import React, { useState, useEffect } from 'react';
import { useLocation } from '../context/LocationContext';
import { Clock, Zap, Gift, Truck, AlertCircle } from 'lucide-react';

const StoreInfo: React.FC = () => {
  const { location } = useLocation();
  const [timeLeft, setTimeLeft] = useState(8 * 60); // 8 minutes in seconds
  
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timerId);
  }, [timeLeft]);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  if (!location) return null;
  
  return (
    <div className="mt-4 mb-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-6 w-6 text-white animate-pulse" />
            <p className="text-white font-bold text-lg animate-pulse">
              MEGA PROMOÇÃO RELÂMPAGO!
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-white text-sm md:text-base">
              Peça agora e ganhe Nutella GRÁTIS!
            </p>
            <Zap className="h-5 w-5 text-yellow-300 animate-bounce" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center space-x-2">
            <Gift className="h-6 w-6 text-yellow-900 animate-bounce" />
            <p className="text-yellow-900 font-bold text-lg">
              OFERTA IMPERDÍVEL!
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-yellow-900 text-sm md:text-base">
              Na compra de 1 açaí, leve outro GRÁTIS!
            </p>
            <span className="text-yellow-900 font-bold animate-pulse">2=1</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Truck className="h-8 w-8 animate-bounce" />
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500 animate-pulse">
              ENTREGA 100% GRÁTIS!
            </h2>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-lg md:text-xl font-medium">
              Entregamos em {location.city} sem taxa!
            </p>
            <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
              <Clock className="h-5 w-5" />
              <span className="font-mono">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;