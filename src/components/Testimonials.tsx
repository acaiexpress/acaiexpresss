import React from 'react';
import { testimonials } from '../data/testimonials';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="mb-16">
      <h2 className="text-3xl font-bold text-purple-900 mb-6">O que nossos clientes dizem</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-3">
              <img 
                src={testimonial.photo} 
                alt={testimonial.name} 
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">{testimonial.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;