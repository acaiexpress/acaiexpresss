export interface Location {
  state: string;
  city: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  bestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  addons: {
    coberturas: string[];
    frutas: string[];
    complementos: string[];
    turbine: string[];
  };
  observations: string;
}

export interface Testimonial {
  id: number;
  name: string;
  photo: string;
  rating: number;
  comment: string;
}

export interface FakeNotification {
  name: string;
  product: Product;
}