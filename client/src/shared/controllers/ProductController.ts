import { Product } from '../models/types';

// Mock Data
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Lumiere Classic Watch",
    price: 299,
    description: "A timeless piece for the modern individual. Features a sapphire crystal face and genuine leather strap.",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800",
    category: "Fashion",
    stock: 15
  },
  {
    id: 2,
    name: "Noise-Cancelling Headphones Pro",
    price: 349,
    description: "Immerse yourself in pure sound with our industry-leading noise cancellation technology.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    category: "Electronics",
    stock: 8
  },
  {
    id: 3,
    name: "Minimalist Desk Lamp",
    price: 89,
    description: "Illuminate your workspace with style. Adjustable brightness and color temperature.",
    image: "https://images.unsplash.com/photo-1507473888900-52e1ad14592d?auto=format&fit=crop&q=80&w=800",
    category: "Home",
    stock: 25
  },
  {
    id: 4,
    name: "Premium Leather Backpack",
    price: 199,
    description: "Handcrafted from full-grain leather. Durable, stylish, and perfect for daily commute.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    category: "Fashion",
    stock: 10
  },
  {
    id: 5,
    name: "Smart Home Hub",
    price: 129,
    description: "Control your entire home with voice commands. Compatible with all major smart devices.",
    image: "https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=800",
    category: "Electronics",
    stock: 5
  },
  {
    id: 6,
    name: "Ceramic Vase Set",
    price: 65,
    description: "A set of 3 handcrafted ceramic vases. Perfect for adding a touch of elegance to any room.",
    image: "https://images.unsplash.com/photo-1581783342308-f792ca11df53?auto=format&fit=crop&q=80&w=800",
    category: "Home",
    stock: 20
  }
];

export class ProductController {
  static async getProducts(): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_PRODUCTS;
  }

  static async getProductById(id: number): Promise<Product | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_PRODUCTS.find(p => p.id === id);
  }

  static async searchProducts(query: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  static async getProductsByCategory(category: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (category === 'All') return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => p.category === category);
  }
}
