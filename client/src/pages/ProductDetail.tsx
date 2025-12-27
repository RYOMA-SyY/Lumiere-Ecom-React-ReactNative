import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useTranslation } from "react-i18next";
import { ProductController } from "../shared/controllers/ProductController";
import { Product } from "../shared/models/types";
import { useStore } from "../lib/store";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Minus, Plus, ShoppingCart, Truck, Shield } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";
import { WishlistButton } from "../components/shared/Wishlist";
import { ReviewSection } from "../components/shared/ProductReview";
import { Breadcrumb } from "../components/shared/Breadcrumb";
import { RelatedProducts } from "../components/shared/RelatedProducts";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const { t } = useTranslation();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    if (params?.id) {
      ProductController.getProductById(Number(params.id)).then((data) => {
        setProduct(data || null);
        setLoading(false);
      });
    }
  }, [params?.id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      toast.success(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart!`);
      setQuantity(1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <Skeleton className="h-[500px] w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!product) return <div className="container py-12 text-center text-muted-foreground">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: t("breadcrumb_home"), href: "/" },
        { label: t("breadcrumb_shop"), href: "/shop" },
        { label: product.name },
      ]} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
        {/* Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-muted rounded-2xl overflow-hidden aspect-square border border-border/50 group cursor-zoom-in"
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125"
            loading="lazy"
          />
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="secondary" className="text-xs uppercase tracking-wide">
                {product.category}
              </Badge>
              {product.stock > 0 ? (
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                  {t("stock")}
                </Badge>
              ) : (
                <Badge variant="destructive">
                  {t("out_of_stock")}
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
            <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed border-b border-border pb-8">
            {product.description}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Quantity:</span>
            <div className="flex items-center gap-3 border border-border rounded-lg p-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-md"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={product.stock === 0}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-md"
                onClick={() => setQuantity(quantity + 1)}
                disabled={product.stock === 0}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <Button 
              size="lg" 
              className="flex-1 h-14 text-lg rounded-xl transition-all duration-200 hover:scale-102 active:scale-98" 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              data-testid={`button-add-cart-${product.id}`}
              aria-label={`Add ${quantity} item(s) to cart`}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock === 0 ? t("out_of_stock") : t("add_to_cart")}
            </Button>
            <WishlistButton productId={product.id} />
          </div>

          {/* Info Badges */}
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Free worldwide shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary flex-shrink-0" />
              <span>2 year warranty</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <ReviewSection />

      {/* Related Products */}
      <RelatedProducts currentProductId={product.id} category={product.category} />
    </div>
  );
}
