import React, { useState } from 'react';
import { states, cities } from '../data/locations';
import { useLocation } from '../context/LocationContext';

interface LocationSelectorProps {
  onClose: () => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onClose }) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState('');
  const { setLocation } = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedState || !selectedCity) {
      setError('Por favor, selecione estado e cidade.');
      return;
    }
    
    setLocation({ state: selectedState, city: selectedCity });
    onClose();
  };

  const currentCities = selectedState ? (cities[selectedState] || []) : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
        <h2 className="text-2xl font-bold text-purple-900 mb-4">Bem-vindo ao Açaí Express!</h2>
        <p className="text-gray-600 mb-4">Para verificarmos se temos entrega na sua região, por favor selecione sua localização:</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              id="state"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity('');
                setError('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="">Selecione um estado</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              Cidade
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              disabled={!selectedState}
              required
            >
              <option value="">Selecione uma cidade</option>
              {currentCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
          )}
          
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationSelector;