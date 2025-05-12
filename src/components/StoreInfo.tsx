import React, { useState, useEffect } from 'react';
import { useLocation } from '../context/LocationContext';
import { Clock, Zap, Gift, Truck } from 'lucide-react';

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
        <div className="bg-red-500 rounded-lg p-4 shadow-lg animate-pulse">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-white" />
            <p className="text-white font-bold">
              URGENTE: Promoção Relâmpago!
            </p>
          </div>
          <p className="text-white mt-1">
            Peça agora e ganhe 1 Nutella GRÁTIS!
          </p>
        </div>

        <div className="bg-yellow-400 rounded-lg p-4 shadow-lg animate-bounce">
          <div className="flex items-center space-x-2">
            <Gift className="h-6 w-6 text-yellow-900" />
            <p className="text-yellow-900 font-bold">
              HOJE: 2 por 1!
            </p>
          </div>
          <p className="text-yellow-900 mt-1">
            Compre 1 açaí e leve outro GRÁTIS!
          </p>
        </div>
      </div>

      <div className="bg-purple-200 rounded-lg p-4 mb-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap">
          <p className="text-purple-900 font-medium">
            <span className="font-bold">Açaí Express</span> - Loja mais próxima: 1,6 km
          </p>
          <p className="text-purple-700 text-sm">
            {location.city}, {location.state}
          </p>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg overflow-hidden shadow-md">
        <div className="p-6 text-white">
          <div className="flex items-center space-x-2">
            <Truck className="h-6 w-6 animate-bounce" />
            <h2 className="text-xl md:text-2xl font-bold">🎉 INAUGURAÇÃO 🎉</h2>
          </div>
          <p className="text-lg md:text-xl font-medium mt-2">
            Entrega GRÁTIS em {location.city}!
          </p>
          <div className="mt-3 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <p className="text-sm">
              Promoção encerra em: 
              <span className="ml-1 bg-white text-purple-700 px-2 py-1 rounded-md font-mono">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;