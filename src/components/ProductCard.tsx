import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { name, price, description, image, bestSeller } = product;
  
  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 
        ${bestSeller ? 'ring-2 ring-yellow-400' : ''}`}
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-72 object-cover"  // Alterado para h-72
        />
        {bestSeller && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
            MAIS VENDIDO
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-purple-700 font-bold text-xl">
            R$ {price.toFixed(2).replace('.', ',')}
          </span>
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm transition-colors duration-300"
          >
            Selecionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
