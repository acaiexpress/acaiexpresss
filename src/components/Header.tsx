import React from 'react';
import { CupSoda as Cup } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-900 to-purple-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Cup className="h-8 w-8 text-purple-200 mr-2" />
          <h1 className="text-2xl md:text-3xl font-bold">Açaí Express</h1>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <a href="#menu" className="hover:text-purple-200 transition-colors duration-300">
            Cardápio
          </a>
          <a href="#testimonials" className="hover:text-purple-200 transition-colors duration-300">
            Depoimentos
          </a>
          <a href="#order" className="hover:text-purple-200 transition-colors duration-300">
            Pedido
          </a>
        </nav>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="bg-white text-purple-700 hover:bg-purple-100 py-1 px-3 md:px-4 rounded-full text-sm md:text-base font-medium transition duration-300">
            Meu Pedido
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;