import React, { useState } from 'react';
import { useLocation } from '../context/LocationContext';
import { useCart } from '../context/CartContext';

const OrderForm: React.FC = () => {
  const { location } = useLocation();
  const { cartItems, total } = useCart();
  
  const [address, setAddress] = useState({
    street: '',
    number: '',
    complement: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio. Adicione produtos antes de finalizar');
      return null;
    }
    
    let message = `*Novo pedido - Açaí Express*\n\n`;
    message += `*Endereço de entrega:*\n`;
    message += `${street}, ${number}`;
    if (complement) message += `, ${complement}`;
    message += `\n${location?.city} - ${location?.state}\n\n`;
    
    message += `*Itens do pedido:*\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} - R$ ${item.product.price.toFixed(2)}\n`;
      
      // Add addons
      const addonCategories = {
        coberturas: 'Coberturas',
        frutas: 'Frutas',
        complementos: 'Complementos',
        turbine: 'Turbine'
      };
      
      Object.entries(item.addons).forEach(([category, selectedItems]) => {
        if (selectedItems.length > 0) {
          message += `   - ${addonCategories[category as keyof typeof addonCategories]}: ${selectedItems.join(', ')}\n`;
        }
      });
      
      // Add observations
      if (item.observations) {
        message += `   - Obs: ${item.observations}\n`;
      }
    });
    
    message += `\n*Total: R$ ${total.toFixed(2)}*`;
    message += `\n\nEntrega GRÁTIS 🎉`;
    
    return encodeURIComponent(message);
  };
  
  const handleSubmitOrder = () => {
    const formattedMessage = formatOrderForWhatsApp();
    if (formattedMessage) {
      window.open(`https://wa.me/5511999999999?text=${formattedMessage}`, '_blank');
    }
  };
  
  return (
    <section id="order" className="mb-16">
      <h2 className="text-3xl font-bold text-purple-900 mb-6">Finalizar Pedido</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Endereço de entrega</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
              Rua
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={address.street}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          
          <div className="col-span-2">
            <label htmlFor="complement" className="block text-sm font-medium text-gray-700 mb-1">
              Complemento (opcional)
            </label>
            <input
              type="text"
              id="complement"
              name="complement"
              value={address.complement}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>
        
        {cartItems.length > 0 ? (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Resumo do pedido</h3>
            
            {cartItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 py-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">
                      {Object.values(item.addons).flat().length > 0 && (
                        <>Adicionais: {Object.values(item.addons).flat().join(', ')}</>
                      )}
                    </p>
                  </div>
                  <p className="font-semibold">R$ {item.product.price.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center py-3 font-bold">
              <p>Total</p>
              <p className="text-purple-700 text-xl">R$ {total.toFixed(2).replace('.', ',')}</p>
            </div>
          </div>
        ) : (
          <div className="bg-purple-50 p-4 rounded-md mb-6">
            <p className="text-purple-700 text-center">
              Você ainda não adicionou nenhum produto ao carrinho
            </p>
          </div>
        )}
        
        <button
          onClick={handleSubmitOrder}
          disabled={cartItems.length === 0}
          className={`w-full py-3 px-4 rounded-md transition duration-300 flex items-center justify-center ${
            cartItems.length > 0
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="mr-2"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Finalizar Pedido pelo WhatsApp
        </button>
      </div>
    </section>
  );
};

export default OrderForm;