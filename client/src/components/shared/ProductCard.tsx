import { Link } from "wouter";
import { Product } from "../../shared/models/types";
import { useTranslation } from "react-i18next";
import { useStore } from "../../lib/store";
import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "../ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
  const addToCart = useStore((state) => state.addToCart);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:shadow-lg transition-shadow duration-300"
      data-testid={`card-product-${product.id}`}
    >
      <div className="aspect-square overflow-hidden bg-muted relative">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <Button size="icon" variant="secondary" className="rounded-full" asChild>
            <Link href={`/product/${product.id}`}>
              <Eye className="w-5 h-5" />
            </Link>
          </Button>
          
          <Button 
            size="icon" 
            className="rounded-full" 
            onClick={() => addToCart(product)}
            data-testid={`button-add-cart-${product.id}`}
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {product.category}
        </div>
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between pt-2">
          <span className="font-bold text-xl text-primary">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
