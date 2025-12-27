export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  preferences: {
    language: 'en' | 'fr' | 'ar';
    currency: 'USD' | 'EUR' | 'SAR';
  };
}
