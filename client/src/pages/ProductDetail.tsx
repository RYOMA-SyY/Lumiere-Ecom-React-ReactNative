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

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const { t } = useTranslation();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    if (params?.id) {
      ProductController.getProductById(Number(params.id)).then((data) => {
        setProduct(data || null);
        setLoading(false);
      });
    }
  }, [params?.id]);

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

  if (!product) return <div className="container py-12 text-center">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image */}
        <div className="bg-muted rounded-2xl overflow-hidden aspect-square border border-border/50">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
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
            <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="flex gap-4 pt-4 border-t border-border">
            <Button size="lg" className="flex-1 h-14 text-lg rounded-xl" onClick={() => addToCart(product)}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {t("add_to_cart")}
            </Button>
            <Button variant="outline" size="lg" className="h-14 w-14 rounded-xl p-0">
              <Shield className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>Free worldwide shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>2 year warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
