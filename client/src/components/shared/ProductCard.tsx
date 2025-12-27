import { Link } from "wouter";
import { Product } from "../../shared/models/types";
import { useTranslation } from "react-i18next";
import { useStore } from "../../lib/store";
import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { WishlistButton } from "./Wishlist";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
      data-testid={`card-product-${product.id}`}
    >
      <div className="aspect-square overflow-hidden bg-muted relative">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <Button 
            size="icon" 
            variant="secondary" 
            className="rounded-full hover:scale-110 transition-transform"
            asChild
          >
            <Link href={`/product/${product.id}`}>
              <Eye className="w-5 h-5" />
            </Link>
          </Button>
          
          <Button 
            size="icon" 
            className="rounded-full hover:scale-110 transition-transform" 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
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
        <Link href={`/product/${product.id}`} className="block group/link">
          <h3 className="font-semibold text-lg leading-tight group-hover/link:text-primary transition-colors cursor-pointer line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between pt-2">
          <span className="font-bold text-xl text-primary">
            ${product.price.toFixed(2)}
          </span>
          <WishlistButton productId={product.id} />
        </div>
        {product.stock === 0 && (
          <div className="text-xs font-medium text-destructive pt-1">Out of Stock</div>
        )}
      </div>
    </motion.div>
  );
}
