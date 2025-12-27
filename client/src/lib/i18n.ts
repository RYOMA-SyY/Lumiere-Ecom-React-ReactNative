import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to Lumiere",
      "hero_title": "Elevate Your Lifestyle",
      "hero_subtitle": "Curated essentials for the modern connoisseur.",
      "shop_now": "Shop Now",
      "featured_products": "Featured Collection",
      "add_to_cart": "Add to Cart",
      "cart": "Cart",
      "checkout": "Checkout",
      "total": "Total",
      "language": "Language",
      "search": "Search products...",
      "categories": "Categories",
      "all": "All",
      "electronics": "Electronics",
      "fashion": "Fashion",
      "home": "Home",
      "view_details": "View Details",
      "description": "Description",
      "stock": "In Stock",
      "out_of_stock": "Out of Stock",
      "login": "Login",
      "profile": "Profile"
    }
  },
  fr: {
    translation: {
      "welcome": "Bienvenue chez Lumiere",
      "hero_title": "Élevez Votre Style de Vie",
      "hero_subtitle": "Des essentiels sélectionnés pour le connaisseur moderne.",
      "shop_now": "Acheter Maintenant",
      "featured_products": "Collection Vedette",
      "add_to_cart": "Ajouter au Panier",
      "cart": "Panier",
      "checkout": "Payer",
      "total": "Total",
      "language": "Langue",
      "search": "Rechercher des produits...",
      "categories": "Catégories",
      "all": "Tout",
      "electronics": "Électronique",
      "fashion": "Mode",
      "home": "Maison",
      "view_details": "Voir Détails",
      "description": "Description",
      "stock": "En Stock",
      "out_of_stock": "Rupture de Stock",
      "login": "Connexion",
      "profile": "Profil"
    }
  },
  ar: {
    translation: {
      "welcome": "مرحبًا بكم في لوميير",
      "hero_title": "ارتقِ بنمط حياتك",
      "hero_subtitle": "أساسيات مختارة للذواقة العصريين.",
      "shop_now": "تسوق الآن",
      "featured_products": "المجموعة المميزة",
      "add_to_cart": "أضف إلى السلة",
      "cart": "السلة",
      "checkout": "الدفع",
      "total": "المجموع",
      "language": "اللغة",
      "search": "البحث عن المنتجات...",
      "categories": "الفئات",
      "all": "الكل",
      "electronics": "إلكترونيات",
      "fashion": "موضة",
      "home": "منزل",
      "view_details": "عرض التفاصيل",
      "description": "الوصف",
      "stock": "متوفر",
      "out_of_stock": "غير متوفر",
      "login": "تسجيل الدخول",
      "profile": "الملف الشخصي"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
