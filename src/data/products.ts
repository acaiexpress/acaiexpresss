import { Product } from '../types';

// Categories
export const CATEGORIES = {
  COMBO: "Pague 1 e Leve 2",
  INDIVIDUAL: "Açaí Individual",
  ZERO: "Açaí Zero Açúcar"
};

export const products: Product[] = [
  {
    id: 1,
    name: "2 copos de açaí 300ml",
    price: 19.90,
    description: "Dois deliciosos copos de açaí tradicional no tamanho 300ml",
    image: "https://i.imgur.com/WG2Vm6c.png",
    category: CATEGORIES.COMBO
  },
  {
    id: 2,
    name: "2 copos de açaí 500ml",
    price: 22.90,
    description: "Dois deliciosos copos de açaí tradicional no tamanho 500ml",
    image: "https://i.imgur.com/WG2Vm6c.png",
    category: CATEGORIES.COMBO
  },
  {
    id: 3,
    name: "2 copos de açaí 700ml",
    price: 26.90,
    description: "Dois deliciosos copos de açaí tradicional no tamanho 700ml",
    image: "https://i.imgur.com/WG2Vm6c.png",
    category: CATEGORIES.COMBO,
    bestSeller: true
  },
  {
    id: 4,
    name: "2 copos de açaí 1L",
    price: 37.90,
    description: "Dois deliciosos copos de açaí tradicional no tamanho 1 litro",
    image: "https://i.imgur.com/WG2Vm6c.png",
    category: CATEGORIES.COMBO
  },
  {
    id: 5,
    name: "1 copo de açaí 300ml",
    price: 19.90,
    description: "Um delicioso copo de açaí tradicional no tamanho 300ml",
    image: "https://i.imgur.com/w8kKhC1.png",
    category: CATEGORIES.INDIVIDUAL
  },
  {
    id: 6,
    name: "1 copo de açaí 500ml",
    price: 22.90,
    description: "Um delicioso copo de açaí tradicional no tamanho 500ml",
    image: "https://i.imgur.com/w8kKhC1.png",
    category: CATEGORIES.INDIVIDUAL
  },
  {
    id: 7,
    name: "1 copo de açaí 700ml",
    price: 26.90,
    description: "Um delicioso copo de açaí tradicional no tamanho 700ml",
    image: "https://i.imgur.com/w8kKhC1.png",
    category: CATEGORIES.INDIVIDUAL
  },
  {
    id: 8,
    name: "1 copo de açaí 1L",
    price: 37.90,
    description: "Um delicioso copo de açaí tradicional no tamanho 1 litro",
    image: "https://i.imgur.com/w8kKhC1.png",
    category: CATEGORIES.INDIVIDUAL
  },
  {
    id: 9,
    name: "1 copo zero açúcar 300ml",
    price: 22.90,
    description: "Um delicioso copo de açaí zero açúcar no tamanho 300ml",
    image: "https://imgur.com/NwlNRj3",
    category: CATEGORIES.ZERO
  },
  {
    id: 10,
    name: "1 copo zero açúcar 500ml",
    price: 25.90,
    description: "Um delicioso copo de açaí zero açúcar no tamanho 500ml",
    image: "https://imgur.com/NwlNRj3",
    category: CATEGORIES.ZERO
  },
  {
    id: 11,
    name: "1 copo zero açúcar 700ml",
    price: 29.90,
    description: "Um delicioso copo de açaí zero açúcar no tamanho 700ml",
    image: "https://imgur.com/NwlNRj3",
    category: CATEGORIES.ZERO
  },
  {
    id: 12,
    name: "1 copo zero açúcar 1L",
    price: 40.90,
    description: "Um delicioso copo de açaí zero açúcar no tamanho 1 litro",
    image: "https://imgur.com/NwlNRj3",
    category: CATEGORIES.ZERO
  }
];

export const ADDONS = {
  coberturas: [
    "Amora", "Caramelo", "Chocolate", "Leite condensado", 
    "Maracujá", "Mel", "Menta", "Morango"
  ],
  frutas: [
    "Abacaxi", "Banana", "Kiwi", "Manga", "Morango", "Uva"
  ],
  complementos: [
    "Amendoim", "Aveia", "Castanha de caju", "Chocoball", 
    "Confete", "Creme de banana", "Creme mousse de maracujá", 
    "Creme de morango", "Farinha de cereais", "Gotas de chocolate", 
    "Granola", "Leite em pó", "Ovomaltine", "Paçoca", "Sucrilhos"
  ],
  turbine: [
    "Bis (3 un)", "Chantilly", "Nutella", "Bola de sorvete", 
    "Creme de Ninho", "Creme de Oreo", "KitKat"
  ]
};