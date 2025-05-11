import React, { useState } from 'react';
import { Product } from '../types';
import { ADDONS } from '../data/products';
import { useCart } from '../context/CartContext';
import { X } from 'lucide-react';

interface AddonsSelectorProps {
  product: Product;
  onClose: () => void;
}

const AddonsSelector: React.FC<AddonsSelectorProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  
  const [selectedAddons, setSelectedAddons] = useState({
    coberturas: [] as string[],
    frutas: [] as string[],
    complementos: [] as string[],
    turbine: [] as string[]
  });
  
  const [observations, setObservations] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    number: '',
    complement: ''
  });
  
  const handleAddonToggle = (category: string, item: string) => {
    setSelectedAddons(prev => {
      const current = prev[category as keyof typeof prev];
      
      const limits: Record<string, number> = {
        coberturas: 2,
        frutas: 2,
        complementos: 4,
        turbine: 1
      };
      
      if (current.includes(item)) {
        return {
          ...prev,
          [category]: current.filter(i => i !== item)
        };
      } else {
        if (current.length < limits[category]) {
          return {
            ...prev,
            [category]: [...current, item]
          };
        }
        return prev;
      }
    });
  };
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const formatOrderForWhatsApp = () => {
    const { street, number, complement } = address;
    
    if (!street || !number) {
      alert('Por favor, preencha seu endereço completo');
      return null;
    }
    
    let message = `*Novo pedido - Açaí Express*\n\n`;
    message += `*Endereço de entrega:*\n`;
    message += `${street}, ${number}`;
    if (complement) message += `, ${complement}`;
    message += `\n\n`;
    
    message += `*Itens do pedido:*\n`;
    message += `${product.name} - R$ ${product.price.toFixed(2)}\n`;
    
    const addonCategories = {
      coberturas: 'Coberturas',
      frutas: 'Frutas',
      complementos: 'Complementos',
      turbine: 'Turbine'
    };
    
    Object.entries(selectedAddons).forEach(([category, items]) => {
      if (items.length > 0) {
        message += `   - ${addonCategories[category as keyof typeof addonCategories]}: ${items.join(', ')}\n`;
      }
    });
    
    if (observations) {
      message += `   - Obs: ${observations}\n`;
    }
    
    message += `\n*Total: R$ ${product.price.toFixed(2)}*`;
    message += `\n\nEntrega GRÁTIS 🎉`;
    
    return encodeURIComponent(message);
  };
  
  const handleSubmit = () => {
    if (!showAddressForm) {
      setShowAddressForm(true);
      return;
    }
    
    const formattedMessage = formatOrderForWhatsApp();
    if (formattedMessage) {
      window.open(`https://wa.me/559985029752?text=${formattedMessage}`, '_blank');
      addToCart({
        product,
        quantity: 1,
        addons: selectedAddons,
        observations
      });
      onClose();
    }
  };
  
  const isFirstOrder = true;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-purple-900">
            {showAddressForm ? 'Endereço de Entrega' : 'Personalizar seu Açaí'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Fechar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-4">
          {!showAddressForm ? (
            <>
              <div className="flex items-center mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-purple-700 font-bold">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>
              
              <section className="mb-6">
                <h4 className="font-bold text-gray-800 mb-2">
                  Coberturas <span className="text-sm font-normal text-gray-600">(escolha até 2)</span>
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {ADDONS.coberturas.map(item => (
                    <button
                      key={item}
                      onClick={() => handleAddonToggle('coberturas', item)}
                      className={`px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedAddons.coberturas.includes(item)
                          ? 'bg-purple-600 text-white'
                          : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>
              
              <section className="mb-6">
                <h4 className="font-bold text-gray-800 mb-2">
                  Frutas <span className="text-sm font-normal text-gray-600">(escolha até 2)</span>
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {ADDONS.frutas.map(item => (
                    <button
                      key={item}
                      onClick={() => handleAddonToggle('frutas', item)}
                      className={`px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedAddons.frutas.includes(item)
                          ? 'bg-purple-600 text-white'
                          : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>
              
              <section className="mb-6">
                <h4 className="font-bold text-gray-800 mb-2">
                  Complementos <span className="text-sm font-normal text-gray-600">(escolha até 4)</span>
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {ADDONS.complementos.map(item => (
                    <button
                      key={item}
                      onClick={() => handleAddonToggle('complementos', item)}
                      className={`px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedAddons.complementos.includes(item)
                          ? 'bg-purple-600 text-white'
                          : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>
              
              <section className="mb-6">
                <h4 className="font-bold text-gray-800 mb-2">
                  Turbine seu açaí <span className="text-sm font-normal text-gray-600">(escolha até 1)</span>
                  {isFirstOrder && <span className="ml-2 text-green-600 font-semibold text-sm">GRÁTIS no 1º pedido!</span>}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {ADDONS.turbine.map(item => (
                    <button
                      key={item}
                      onClick={() => handleAddonToggle('turbine', item)}
                      className={`px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedAddons.turbine.includes(item)
                          ? 'bg-purple-600 text-white'
                          : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>
              
              <section className="mb-6">
                <h4 className="font-bold text-gray-800 mb-2">Observações</h4>
                <textarea
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  maxLength={140}
                  placeholder="Alguma observação para o seu pedido? (até 140 caracteres)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  rows={3}
                ></textarea>
                <p className="text-right text-sm text-gray-500">
                  {observations.length}/140 caracteres
                </p>
              </section>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                  Rua
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                  Número
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={address.number}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="complement" className="block text-sm font-medium text-gray-700 mb-1">
                  Complemento (opcional)
                </label>
                <input
                  type="text"
                  id="complement"
                  name="complement"
                  value={address.complement}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          )}
          
          <button
            onClick={handleSubmit}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-4 rounded-md transition duration-300 mt-6"
          >
            {showAddressForm ? 'Finalizar Pedido' : 'Continuar para Endereço'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddonsSelector;