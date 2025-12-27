import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/shared/ProductCard";
import { ProductController } from "../shared/controllers/ProductController";
import { Product } from "../shared/models/types";
import heroImage from "@assets/generated_images/minimalist_modern_e-commerce_hero_banner_with_abstract_shapes.png";

export default function Home() {
  const { t } = useTranslation();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    ProductController.getProducts().then((products) => {
      setFeaturedProducts(products.slice(0, 4));
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden bg-muted/20">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent rtl:bg-gradient-to-l" />
        </div>

        <div className="container relative z-10 h-full flex items-center px-4">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
              {t("hero_title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              {t("hero_subtitle")}
            </p>
            <div className="pt-4 flex gap-4">
              <Link href="/shop">
                <Button size="lg" className="text-lg px-8 rounded-full">
                  {t("shop_now")} <ArrowRight className="ml-2 w-5 h-5 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 container px-4 mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{t("featured_products")}</h2>
            <p className="text-muted-foreground">Hand-picked for quality and style.</p>
          </div>
          <Link href="/shop">
            <Button variant="link" className="text-primary hidden md:flex">
              View All <ArrowRight className="ml-2 w-4 h-4 rtl:rotate-180" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/shop">
            <Button variant="outline" className="w-full">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories / Promo */}
      <section className="py-24 bg-muted/30 border-y border-border/50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Electronics', 'Fashion', 'Home'].map((category, i) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-80 rounded-2xl overflow-hidden bg-card border border-border cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                {/* Placeholder images for categories */}
                <img 
                  src={
                    category === 'Electronics' ? 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800' :
                    category === 'Fashion' ? 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&q=80&w=800' :
                    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'
                  }
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={category}
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">{t(category.toLowerCase())}</h3>
                  <div className="h-1 w-12 bg-primary rounded-full group-hover:w-24 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
