import React, { useState } from 'react';
import { products, CATEGORIES } from '../data/products';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface MenuProps {
  onSelectProduct: (product: Product) => void;
}

const Menu: React.FC<MenuProps> = ({ onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES.COMBO);
  
  const categories = Object.values(CATEGORIES);
  
  const filteredProducts = products.filter(
    product => product.category === activeCategory
  );
  
  return (
    <section id="menu" className="mb-16">
      <h2 className="text-3xl font-bold text-purple-900 mb-6">Nosso Cardápio</h2>
      
      <div className="flex overflow-x-auto pb-2 mb-6 gap-2 scrollbar-hide">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-300 ${
              activeCategory === category
                ? 'bg-purple-700 text-white'
                : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={() => onSelectProduct(product)}
          />
        ))}
      </div>
    </section>
  );
};

export default Menu;