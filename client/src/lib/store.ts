import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User } from '../shared/models/types';
import i18n from './i18n';

interface AppState {
  cart: CartItem[];
  user: User | null;
  language: 'en' | 'fr' | 'ar';
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setLanguage: (lang: 'en' | 'fr' | 'ar') => void;
  setUser: (user: User | null) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      cart: [],
      user: null,
      language: 'en',
      addToCart: (product) => set((state) => {
        const existingItem = state.cart.find(item => item.id === product.id);
        if (existingItem) {
          return {
            cart: state.cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
      })),
      updateQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map(item =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        ).filter(item => item.quantity > 0)
      })),
      clearCart: () => set({ cart: [] }),
      setLanguage: (lang) => {
        i18n.changeLanguage(lang);
        document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.body.lang = lang;
        set({ language: lang });
      },
      setUser: (user) => set({ user }),
    }),
    {
      name: 'lumiere-storage',
    }
  )
);
